/**
 * Convert the smallest unit to readable value of a token
 * 
 * @param amount - The amount in the smallest unit
 * @param decimals - The number of decimals of the token
 * 
 * @returns - The human readable value
 */
export default function amountToString(amount: string | bigint, decimals = 18): string {
    
    const strAmount = amount.toString();
  
    if (strAmount.length <= decimals) {
      return `0.${strAmount.padStart(decimals - strAmount.length, '0')}`.replace(/\.?0+$/, "");
    }
  
    const xrp = strAmount.slice(0, strAmount.length - decimals);
    const xrpDecimal = strAmount.slice(strAmount.length - decimals);
  
    // concat and remove all trailing zeros
    return `${xrp}.${xrpDecimal}`.replace(/\.?0+$/, "");
  }