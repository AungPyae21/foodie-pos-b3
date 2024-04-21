interface Config {
  googleClientID: string;
  gooleClientSecret: string;
  backOfficeBaseUrl: string;
}
export const config: Config = {
  googleClientID: process.env.GOOGLE_CLIENT_ID as string,
  gooleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  backOfficeBaseUrl: process.env.NEXT_PUBLIC_BACKOFFICE_BASE_URL as string,
};
