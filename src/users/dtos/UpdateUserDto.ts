
import { IsString, IsNotEmpty } from "class-validator";
import { IsOptional } from "class-validator"

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    username?: string;

    @IsString()
    @IsOptional()
    displayName?: string
}