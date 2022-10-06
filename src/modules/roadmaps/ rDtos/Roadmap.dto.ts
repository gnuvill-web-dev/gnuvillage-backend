
export class RoadmapDto{
    readonly name: string;

    readonly description: string;

}
export class ResultDto<T>
{
    private message: string;
    private status: bigint;
    private data;
}