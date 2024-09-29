export class CreateAuthorDto {
  name: string;
  birthDate: string; // ISO date format (YYYY-MM-DD)
  deathDate?: string; // Optional in case the author is still alive
  nationality: string;
  biography: string;
}
