DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Getsubsubitemdata`()
BEGIN
    SELECT 
        m.serialNumber AS moduleSerial,
        m.name AS moduleName,
        app.serialNumber AS appSerial,
        app.name AS appName,
        menu.serialNumber AS menuSerial,
        menu.title AS menuTitle,
        i.name as itemName,
        subi.nmae as subitem,
        ssi.*
    FROM sub_sub_item ssi
	left join sub_item subi on subi.id=ssi.subItemId
    left join item i on i.id=si.itemid
	left JOIN menu ON menu.id = i.menuId
	left JOIN app ON app.id = menu.appId
    left join modules m on m.id=app.moduleId
    ORDER BY 
        m.serialNumber,
        app.serialNumber,
        menu.serialNumber,
        i.serialNumber,
        si.serialNumber,
        ssi.serialNumber;
END$$
DELIMITER ;
