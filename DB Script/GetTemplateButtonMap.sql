DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTemplateButtonMap`()
BEGIN
SELECT md.id as moduleid,	md.name AS moduleName,
	app.name AS appName,
	menu.title AS menuTitle,app.id as appid,menu.id as menuid,item.name as itemName,field.fieldGroupCode,field.tier,field.displayType,
si.name as subItemName,ssi.name as subSubItemName,sssi.name as subsubsubItemName,
si.id as subitemid,
ssi.id as subsubitemid,
sssi.id as subsubsubitemid,
tb.* FROM mukut_feature_db.template_button_map tb
inner join item on tb.itemId=item.id
inner JOIN menu ON menu.id = item.menuid
inner JOIN app ON app.id = menu.appid
inner join modules md on md.id=app.moduleid
inner join field on field.id=tb.dfGroupId
left join sub_item si on si.itemid=item.id
left join sub_sub_item ssi on ssi.subItemId=si.id
left join sub_sub_sub_item sssi on sssi.subSubItemId=ssi.id;
END$$
DELIMITER ;
