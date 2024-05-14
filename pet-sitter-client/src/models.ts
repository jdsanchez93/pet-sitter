export interface Note {
    noteId: number;
    title: string;
    description: string;
    noteDate: Date;
    photos: Photo[];
}

export interface Photo {
    photoId: number;
    s3Key: string;
    isDelete: boolean;
}