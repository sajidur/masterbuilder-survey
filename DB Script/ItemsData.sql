DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ItemsData`()
BEGIN
    SELECT 
        m.serialNumber AS moduleSerial,
        m.name AS moduleName,
		m.id AS moduleid,
		app.id AS appid,
		menu.id AS menuid,
        app.serialNumber AS appSerial,
        app.name AS appName,
        menu.serialNumber AS menuSerial,
        menu.title AS menuTitle,
        item.*
    FROM item
	left JOIN menu ON menu.id = item.menuId
	left JOIN app ON app.id = menu.appId
    left join modules m on m.id=app.moduleId
    ORDER BY 
        m.serialNumber,
        app.serialNumber,
        menu.serialNumber,
        item.serialNumber;
END$$
DELIMITER ;
