DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDataPointmapsBySP`()
BEGIN
SELECT 
    fi.fieldGroupCode,
    fi.name,
    dp.dataPoint AS datapoint,
    i.name as itemName,
    dtm.*,
    md.id as moduleid,
    app.id as appid,
    menu.id as menuid
FROM datapointmap dtm
INNER JOIN field fi ON dtm.dpgroupid = fi.id
INNER JOIN datapoint dp ON dtm.datapointid  = dp.id
INNER JOIN item i ON dtm.itemId = i.id
INNER JOIN menu  ON menu.id  =i.menuid
INNER JOIN app ON app.id  = menu.appid
INNER JOIN modules md ON md.id  = app.moduleid

LIMIT 0, 10000;

END$$
DELIMITER ;
