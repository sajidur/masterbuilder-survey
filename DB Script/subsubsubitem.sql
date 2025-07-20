DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Getsubsubsubitemdata`()
BEGIN
    SELECT 
        m.serialNumber AS moduleSerial,
        m.name AS moduleName,
        app.serialNumber AS appSerial,
        app.name AS appName,
        menu.serialNumber AS menuSerial,
        menu.title AS menuTitle,
        i.name as itemName,
        si.name as subitem,
        ssi.name,
		i.id as itemid,
		m.id AS moduleid,
		app.id AS appid,
		menu.id AS menuid,
		si.id as subitemid,
        sssi.*
    FROM sub_sub_sub_item sssi
	left join sub_sub_item ssi on ssi.id=sssi.subSubItemId
	left join sub_item si on si.id=ssi.subItemId
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
        ssi.serialNumber,
        sssi.serialNumber;
END$$
DELIMITER ;
