CREATE DEFINER=`root`@`localhost` PROCEDURE `getDataPointmapsBySP`()
BEGIN
    SELECT 
        fi.fieldGroupCode,fi.name,dp.dataPoint as datapoint,dtm.*
    FROM datapointmap dtm
    inner JOIN field fi ON dtm.dpgroupid = fi.id
	inner JOIN datapoint dp ON dtm.datapointid = dp.id;
END