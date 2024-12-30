

export type Filter = {
  purchasedProducts: string
  purchaseChannel: Array<string>
}



export type User = {
  avatar: string;
  isDeleted: boolean;
  isActive: boolean;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  kycStatus: string;
}

export type GetUsersListResponse = {
  message: string;
  success: boolean;
  status: number;
  total?: number;
  users?: User[];
}

export interface UsersResponse {
  message: string;
  success: boolean;
  status: number;
  data: UsersData;
}

export interface GroupData {
  description: string;
  isDeleted: boolean;
  _id: string;
  groupImage: string;
  groupName: string;
  createdBy: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}


// export interface UsersData {
//     address: string;
//     avatar: string;
//     blocked: boolean;
//     createdAt: string;
//     departmentName: string;
//     designation: string;
//     email: string;
//     firstName: string;
//     isActive: boolean;
//     isDeleted: boolean;
//     lastName: string;
//     phoneNumber: string | null;
//     resetPasswordExpires: number;
//     resetPasswordOtp: number;
//     role: string;
//     status: number;
//     updatedAt: string;
//     walletAddress: string;
//     _id: string;
//     message: string;
//     statusCode: number;
//     success: boolean;
//   }

export interface UsersData {

    user_details: {
      walletAddress: string;
      role: string;
      blocked: boolean;                   // Blocked status (true/false)
      kycStatus: string;                  // KYC status (e.g., "REJECTED")
      kycRemarks: string;                 // KYC remarks
      avatar: string;                     // Avatar image URL
      resetPasswordOtp: number;           // OTP for password reset
      resetPasswordExpires: number;       // Expiry time for password reset OTP
      isDeleted: boolean;                 // Deleted status (true/false)
      isActive: boolean;                  // Active status (true/false)
      address: string;                    // User's address
      phoneNumber: string | null;          // Phone number (nullable)
      designation: string;                // User's job title or designation
      departmentName: string;             // Department name
      _id: string;                        // User ID
      firstName: string;                  // User's first name
      lastName: string;                   // User's last name
      email: string;                      // User's email address
      createdAt: string;                  // User registration date
      updatedAt: string;                  // Last update date
    };
    kyc_details: {
      personal_information: {
        date_of_birth: string;          
        nationality: string;            
        gender: string;                 
      };
      identification_details: {
        id_type: string;                
        id_number: string;            
        id_issue_date: string;          
        id_expiry_date: string;         
        issued_by: string;              
      };
      address_information: {
        residential_address: string;    
        address_proof_type: string;     
        address_proof_document: string; 
        address_verification_date: string; 
      };
      contact_information: {
        phone_number: string;           
        preferred_contact_method: string;
        email:string 
      };
      employment_information: {
        occupation: string;            
        employer_name: string;          
        employer_address: string;       
      };
      financial_information: {
        source_of_funds: string;        
        annual_income: number;          
        tax_identification_number: string; 
      };
      _id: string;                       
      user: string;                       
      email: string;                      
      createdAt: string;                  
      updatedAt: string;                  
      __v: number;                        
    };


}



export interface DeleteResponse {
  status: boolean;
  message: string;
  success: boolean;
}

export interface DeleteData {
  id: string | number;
  status: boolean

}