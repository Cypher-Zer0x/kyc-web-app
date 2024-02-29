export interface ValidateAddressResponse {
  summary: string;
  name: string;
  isMaliciousAddress: boolean;
  isAssociatedWithProtocol: boolean;
  tags: {
    THEFT: boolean;
    CYBERCRIME: boolean;
    NO_DATA: boolean;
    SANCTIONED: boolean;
    MIXER: boolean;
    BOT: boolean;
    WASH_TRADER: boolean;
  };
}
