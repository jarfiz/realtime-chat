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
  } catch (error) {
    console.log("Error in getChatPartners controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessageByUserId = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in getMessageByUserId controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in sendMessage controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
