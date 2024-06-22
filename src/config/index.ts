interface Config {
  googleClientID: string;
  gooleClientSecret: string;
  backOfficeBaseUrl: string;
  orderapiBaseUrl: string;
  spaceEndpoint: string;
  spaceAccessKeyId: string;
  spaceSecretAccessKey: string;
  orderAppUrl: string;
}
export const config: Config = {
  googleClientID: process.env.GOOGLE_CLIENT_ID as string,
  gooleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  backOfficeBaseUrl: process.env.NEXT_PUBLIC_BACKOFFICE_BASE_URL as string,
  orderapiBaseUrl: process.env.NEXT_PUBLIC_ORDER_API_BASE_URL || "",
  spaceEndpoint: process.env.SPACE_ENDPOINT || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY_ID || "",
  spaceSecretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY || "",
  orderAppUrl: process.env.NEXT_PUBLIC_ORDER_APP_URL || "",
};
