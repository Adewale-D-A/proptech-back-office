export type chatList = {
  id: number;
  user_id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    profile_photo: string;
  };
  created_at: string;
  updated_at: string;
  last_message: {
    id: number;
    message: string;
    sender: string;
    files: any;
    message_type: string;
    chat_id: number;
    user_id: number;
    admin_id: string;
    created_at: string;
    updated_at: string;
  };
};

export type chatHistory = {
  id: number;
  message: string;
  sender: string;
  files: any;
  message_type: string;
  chat_id: number;
  user_id: number;
  admin_id: string;
  created_at: string;
  updated_at: string;
};
