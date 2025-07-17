DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetDataPoint`()
BEGIN
    SELECT 
        md.serialNumber AS moduleSerial,
        md.name AS moduleName,
        app.serialNumber AS appSerial,
        app.name AS appName,
        menu.serialNumber AS menuSerial,
        menu.title AS menuTitle,
        item.serialNumber AS itemSerial,
        item.name AS itemName,
        si.serialNumber AS subItemSerial,
        si.name AS subItemName,
        ssi.name AS subSubItemName,
        sssi.name as subsubsubItemName,
        fi.fieldGroupCode as fieldGroupCode,
        fi.serialNumber as fieldGroupCodeSerialNumber,
        fi.DisplayType as DisplayType,
        fi.remarks as remarks,
        dp.*
    FROM modules md 
    left JOIN app ON md.id = app.moduleId
    left JOIN menu ON app.id = menu.appId
    left JOIN item ON menu.id = item.menuId
    left JOIN sub_item si ON item.id = si.itemId
    left JOIN sub_sub_item ssi ON si.id = ssi.subItemId
	left JOIN sub_sub_sub_item sssi ON ssi.id = sssi.subSubItemId
	left JOIN field fi ON fi.itemId = item.id
	left JOIN datapoint dp ON fi.id = dp.dpGroupCode
    ORDER BY 
        md.serialNumber,
        app.serialNumber,
        menu.serialNumber,
        item.serialNumber,
        si.serialNumber,
        ssi.serialNumber,
        sssi.serialNumber,
        fi.serialNumber;
END$$
DELIMITER ;
