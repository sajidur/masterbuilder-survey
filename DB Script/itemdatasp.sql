DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `menuData`()
BEGIN
    SELECT 
        m.serialNumber AS moduleSerial,
		m.id AS moduleid,
		app.id AS appid,
        m.name AS moduleName,
        app.serialNumber AS appSerial,
        app.name AS appName,
        menu.*
    FROM menu
	left JOIN app ON app.id = menu.appId
    left join modules m on m.id=app.moduleId
    ORDER BY 
        m.serialNumber,
        app.serialNumber,
        menu.serialNumber;
END$$
DELIMITER ;
