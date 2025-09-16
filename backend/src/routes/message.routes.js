import { Router } from "express";
import {
  getAllContacts,
  getChatPartners,
  getMessageByUserId,
  sendMessage,
} from "../controller/message.controller.js";
import protectedRoute from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectedRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessageByUserId);
router.post("/send/:id", sendMessage);

export default router;
