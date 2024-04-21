export interface BasedOptions {
  OnSuccess?: (data?: any) => void;
  OnError?: (error?: any) => void;
}

export interface userInfo extends BasedOptions {
  email: string;
  password: string;
}
