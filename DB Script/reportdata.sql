DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ReportData`()
BEGIN
    SELECT 
        md.serialNumber,md.name,app.serialNumber as appserialNumber, app.name as appname,menu.serialNumber as menuserialNumber,
        menu.title,item.serialNumber as itemserialNumber,item.name as itemName,item.buttonType,item.buttonLabel,item.navigationTo,item.description,
        si.serialNumber as subserialNumber,si.name as subitem,ssi.*,sssi.*,fi.*,dp.*
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
