import axios from 'axios';
import { ValidateAddressResponse } from '../types';

const HARPIE_API_ENDPOINT = 'https://api.harpie.io/v2/validateAddress';
const HARPIE_API_KEY = "f4d7d56b-92de-4b97-a01a-21b63d8b9929"; // TEst free  key

export async function validateAddress(address: string): Promise<ValidateAddressResponse | null> {
    try {
        const response = await axios.post(HARPIE_API_ENDPOINT, {
            address: address,
            apiKey: HARPIE_API_KEY
        }, {
            headers: {
                'Authorization': `Bearer ${HARPIE_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Renvoie la réponse de l'API
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response);
            return null;
        } else {
            console.error('Unexpected error:', error);
            return null;
        }
    }
}
