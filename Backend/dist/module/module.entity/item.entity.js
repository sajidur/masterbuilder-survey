"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const typeorm_1 = require("typeorm");
const menu_entity_1 = require("./menu.entity");
const subitem_entity_1 = require("./subitem.entity");
const swagger_1 = require("@nestjs/swagger");
let Item = class Item {
    id;
    name;
    menuId;
    menu;
    subItems;
};
exports.Item = Item;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Item.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Name of the item' }),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Menu ID' }),
    __metadata("design:type", Number)
], Item.prototype, "menuId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => menu_entity_1.Menu, (menu) => menu.items),
    __metadata("design:type", menu_entity_1.Menu)
], Item.prototype, "menu", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subitem_entity_1.SubItem, (subItem) => subItem.item),
    __metadata("design:type", Array)
], Item.prototype, "subItems", void 0);
exports.Item = Item = __decorate([
    (0, typeorm_1.Entity)()
], Item);
//# sourceMappingURL=item.entity.js.map