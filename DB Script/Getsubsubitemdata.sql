DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Getsubsubitemdata`()
BEGIN
    SELECT 
        m.serialNumber AS moduleSerial,
		m.id AS moduleid,
        m.name AS moduleName,
        app.serialNumber AS appSerial,
		app.id AS appid,
        app.name AS appName,
        menu.serialNumber AS menuSerial,
		menu.id AS menuid,
        menu.title AS menuTitle,
		i.id as itemid,
        i.name as itemName,
		si.id as subitemid,
        si.name as subitem,
        ssi.*
    FROM sub_sub_item ssi
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
        ssi.serialNumber;
END$$
DELIMITER ;
