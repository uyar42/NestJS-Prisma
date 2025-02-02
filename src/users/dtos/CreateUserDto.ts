

import { IsString, IsNotEmpty } from "class-validator";
import { IsOptional } from "class-validator"

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsOptional()
    displayName?: string
}