import cloudinary from "../lib/cloudinary.js";
import prisma from "../lib/prisma.js";

export const getAllContacts = async (req, res) => {
  try {
    const userId = req.user.id;

    const filteredUser = await prisma.user.findMany({
      omit: {
        password: true,
      },
      where: {
        NOT: {
          id: userId,
        },
      },
    });

    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in getAllContacts controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const userId = req.user.id;
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
          },
          {
            receiverId: userId,
          },
        ],
      },
    });

    const getChatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId === userId ? msg.receiverId : msg.senderId
        )
      ),
    ];

    const chatPartners = await prisma.user.findMany({
      where: {
        id: {
          in: getChatPartnerIds,
        },
      },
    });

    res.status(200).json(chatPartners);
  } catch (error) {
    console.log("Error in getChatPartners controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessageByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const userToChat = req.params.id;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: userToChat },
          { senderId: userToChat, receiverId: userId },
        ],
      },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessageByUserId controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user.id;
    const receiverId = req.params.id;

    if (!text && !image) {
      return res.status(400).json({ message: "Image or text is required" });
    }

    if (senderId === receiverId) {
      res.status(400).json({ message: "Cannot send message to yourself" });
    }

    const receiverExists = await prisma.message.findMany({
      where: {
        id: receiverId,
      },
    });

    if (!receiverExists) {
      res.status(400).json({ message: "Receiver not found" });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await prisma.message.create({
      data: {
        text,
        image: imageUrl,
        senderId,
        receiverId,
      },
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
