import { flagResponseDTO, tempResponseDTO } from "../dtos/temp.response.dto.js";

export const getTempData = () => {
    return tempResponseDTO("This is TEST! >.0");
};

import { BaseError } from "../config/error.js";
import { status } from "../config/response.status.js";

export function CheckFlag(flag){
    if(flag == 1)
        throw new BaseError(status.BAD_REQUEST);
    else{
        return flagResponseDTO(flag);
    }
};