DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetDPGroupMap`()
BEGIN
SELECT item.name as itemName,si.name as subItemName,ssi.name as subSubItemName,sssi.name as subsubsubItemName,field.fieldGroupCode,dgm.* ,
    md.id as moduleid,
    app.id as appid,
    menu.id as menuid,
	si.id as subitemid,
    ssi.id as subsubitemid,
    sssi.id as subsubsubitemid
FROM dpgroupmap dgm
inner join item on item.id=dgm.itemId
inner join field on field.id=dgm.dpGroupId
INNER JOIN menu  ON menu.id  =item.menuid
INNER JOIN app ON app.id  = menu.appid
INNER JOIN modules md ON md.id  = app.moduleid
left join sub_item si on dgm.subItemId=si.id
left join sub_sub_item ssi on dgm.subSubItemId=ssi.id
left join sub_sub_sub_item sssi on dgm.subSubSubItemId=sssi.id;

END$$
DELIMITER ;
