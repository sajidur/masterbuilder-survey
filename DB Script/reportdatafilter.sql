DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ReportDataFilter`(
    IN includeDatapoint BOOLEAN
)
BEGIN
    SELECT 
        md.serialNumber,
        md.name,
        app.serialNumber AS appserialNumber,
        app.name AS appname,
        menu.serialNumber AS menuserialNumber,
        menu.title,
        item.serialNumber AS itemserialNumber,
        item.name AS itemName,
        item.buttonType,
        item.buttonLabel,
        item.navigationTo,
        item.description,
        si.serialNumber AS subserialNumber,
        si.name AS subitem,
        ssi.*,
        sssi.*,
        fi.*,

        -- Datapoint fields conditionally included
      IF(includeDatapoint, dp.id, NULL) AS dp_id,
        IF(includeDatapoint, dp.dpGroupCode, NULL) AS dp_dpGroupCode,
        IF(includeDatapoint, dp.datapoint, NULL) AS datapoint,
        IF(includeDatapoint, dp.isHide, NULL) AS isHide
    FROM modules md
    LEFT JOIN app ON md.id = app.moduleId
    LEFT JOIN menu ON app.id = menu.appId
    LEFT JOIN item ON menu.id = item.menuId
    LEFT JOIN sub_item si ON item.id = si.itemId
    LEFT JOIN sub_sub_item ssi ON si.id = ssi.subItemId
    LEFT JOIN sub_sub_sub_item sssi ON ssi.id = sssi.subSubItemId
    LEFT JOIN field fi ON fi.itemId = item.id
    LEFT JOIN datapoint dp ON fi.id = dp.dpGroupCode

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
