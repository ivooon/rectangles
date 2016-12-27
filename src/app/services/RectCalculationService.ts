import {RectDto} from "../api/dto/RectDto";

export class RectCalculationService{

  public static intersection(rect1: RectDto,
                             rect2: RectDto) : RectDto {
    let r1x1 = rect1.x;
    let r1y1 = rect1.y;
    let r2x1 = rect2.x;
    let r2y1 = rect2.y;
    let r1x2 = r1x1 + rect1.width;
    let r1y2 = r1y1 + rect1.height;
    let r2x2 = r2x1 + rect2.width;
    let r2y2 = r2y1 + rect2.height;
    if (r1x1 < r2x1) r1x1 = r2x1;
    if (r1y1 < r2y1) r1y1 = r2y1;
    if (r1x2 > r2x2) r1x2 = r2x2;
    if (r1y2 > r2y2) r1y2 = r2y2;
    r1x2 -= r1x1;
    r1y2 -= r1y1;
    return new RectDto(r1x1, r1y1, r1x2, r1y2);
  }

  public static checkCollision(rect1: RectDto,
                               rect2: RectDto,
                               inclusive: boolean = true) : boolean{
    return inclusive ?
      !(
        rect1.x + rect1.width < rect2.x ||
        rect1.x > rect2.x + rect2.width ||
        rect1.y + rect1.height < rect2.y ||
        rect1.y > rect2.y + rect2.height
      ) :
      !(
        rect1.x + rect1.width <= rect2.x ||
        rect1.x >= rect2.x + rect2.width ||
        rect1.y + rect1.height <= rect2.y ||
        rect1.y >= rect2.y + rect2.height
      );
  }
}
