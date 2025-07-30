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
   --      si.serialNumber AS subItemSerial,
--         si.name AS subItemName,
--         ssi.name AS subSubItemName,
--         sssi.name as subsubsubItemName,
		md.id AS moduleid,
		app.id AS appid,
		menu.id AS menuid,
		item.id as itemid,
-- 		si.id as subitemid,
-- 		ssi.id as subsubitemid,
-- 		sssi.id as subsubsubitemid,
		fi.fieldgroupcode,
        dp.*
    FROM datapoint dp
    left join field fi on fi.id=dp.dpGroupCode
	left JOIN item ON item.id = dp.itemId
	left JOIN menu ON menu.id = item.menuid
	left JOIN app ON app.id = menu.appid
    left join modules md on md.id=app.moduleid
--     left JOIN sub_item si ON item.id = si.itemId
--     left JOIN sub_sub_item ssi ON si.id = ssi.subItemId
-- 	left JOIN sub_sub_sub_item sssi ON ssi.id = sssi.subSubItemId
    ORDER BY 
        md.serialNumber,
        app.serialNumber,
        menu.serialNumber,
        item.serialNumber,
--         si.serialNumber,
--         ssi.serialNumber,
--         sssi.serialNumber,
        fi.serialNumber;

END$$
DELIMITER ;
