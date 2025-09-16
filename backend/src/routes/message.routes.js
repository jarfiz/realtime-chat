import { Router } from "express";
import {
  getAllContacts,
  getChatPartners,
  getMessageByUserId,
  sendMessage,
} from "../controller/message.controller.js";

const router = Router();

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessageByUserId);
router.get("/send/:id", sendMessage);

export default router;
