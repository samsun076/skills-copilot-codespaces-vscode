function skillsMember (req, res) {
  var member_id = req.params.member_id;
  var query = 'select * from skills where member_id = ?';
  db.query(query, [member_id], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}