import { GifData, GifItem } from "@appgifs/interfaces/gifs.interface";

// Estos objetos o clases se usan para mapear un objeto que venga desde una api y que este devuelva dicha información basada en una interfaz
export class GifMapper {
    static gifItemReseived(item: GifData): GifItem {
        return {
            id: item.id,
            title: item.title,
            url: item.images.original.url
        };
    }

    static gifItemReseivedArray(items: GifData[]): GifItem[] {
        return items.map(this.gifItemReseived);

}

}