export interface UserDataProps {
  full_name: string;
  email: string;
  phone_number: {
    countryCode: string;
    number: string;
  };
  credit_card_number: string;
  card_holder_name: string;
  month: string;
  year: string;
  cvc: string;
  user_id: {
    id_type: string;
    id_number: string;
  };
  number_of_payments: number;
  accept_terms_and_conditions: boolean;
}