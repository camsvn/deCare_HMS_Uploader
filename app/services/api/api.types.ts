import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { Patient } from "../../models/patient/patient"
import { UserSession } from "../../models/userSession/userSession"

export interface User {
  id: number
  name: string
}

export interface HealthCheck {
  message: string
  uptime: number
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

export type GetPatientResult = { kind: "ok"; patient: Patient } | GeneralApiProblem

export type GetUserSessionResult = { kind: "ok"; tokens: UserSession } | GeneralApiProblem
export type GetHealthCheckResult = { kind: "ok"; healthCheck: HealthCheck } | GeneralApiProblem