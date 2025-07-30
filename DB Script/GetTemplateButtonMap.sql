DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTemplateButtonMap`()
BEGIN
SELECT item.name as itemName,field.fieldGroupCode,field.tier,field.displayType,tb.* FROM mukut_feature_db.template_button_map tb
inner join item on tb.itemId=item.id
inner join field on field.id=tb.dfGroupId;
END$$
DELIMITER ;
