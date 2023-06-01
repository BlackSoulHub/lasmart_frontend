import { ICommentDto } from "./CommentModels"


export interface IDotDto {
    id: number,
    x: number,
    y: number,
    radius: number,
    color: string
    comments: ICommentDto[]
}