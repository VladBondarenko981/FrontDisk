export interface userLogin {
  email: string;
  password: string;
}

export interface userRegistration {
  email: string;
  password: string;
}

export interface FavOption {
  filename: string;
  favOption: boolean;
}

export interface File {
  id: number;
  filename: string;
  originalname: string;
  size: number;
  mimetype: string;
  favFile: boolean;
  isDeleted: boolean;
  deletedAt: Date;
}
