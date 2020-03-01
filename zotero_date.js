var items = Zotero.getActiveZoteroPane().getSelectedItems();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var monthsDE = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
for (var item of items) {
  var datold = item.getField('date');
  if (datold == "") {
    continue;
  }
  // guessing what comes first, M or D
  var md = datold.search(/,|-|\//);
//  alert(datold+" --> "+md);
  var dats = datold.split(/,|\.| |-|\//);
  var year = 0;
  var month = 0;
  var day = 0;
  for (var dat of dats) {
    if (dat.length == 0) {
      continue;
    }
    var found = months.findIndex(mo => mo == dat.substr(0,3));
    if (found < 0) {
      found = monthsDE.findIndex(mo => mo == dat.substr(0,3));
    }
    if (found >= 0) {
      if (month != 0) {
        alert(datold+" Month already set to "+month+" New: "+dat);
        exit;
      }
      month = found+1;
      continue;
    }
    if (dat.length == 4) {
      if (year != 0) {
        alert(datold+" Year already set to "+year+" New: "+dat);
        exit;
      }
      year = dat;
      continue;
    }
    if (dat.length <= 2) {
      if (md >= 0) {
        // month first
        if (month == 0) {
          month = dat;
        } else if (day == 0) {
          day = dat;
        } else {
          alert(datold+" Month "+month+" day "+day+" New: "+dat);
          exit;
        }
      } else {
        // day first
        if (day == 0) {
          day = dat;
        } else if (month == 0) {
          month = dat;
        } else {
          alert(datold+" Day "+day+" month "+month+" New: "+dat);
          exit;
        }
      }
    } else {
      alert(datold+" Cannot understand: "+dat);
      exit;
    }
  }
  var datnew = year;
  if (month != 0 ) {
    var smonth=month+""
    if (smonth.length == 1) {
      datnew = datnew+"-0"+smonth;
    } else if (smonth.length == 2) {
      datnew = datnew+"-"+smonth;
    } else {
      alert(datold+" Month too long: "+smonth+" "+smonth.length);
      exit;
    }
  }
  if (day != 0) {
    if (month == 0) {
      alert(datold+" Month is zero and day is "+day);
    }
    var sday = day+""
    if (sday.length == 1) {
      datnew = datnew+"-0"+sday;
    } else if (sday.length == 2) {
      datnew = datnew+"-"+sday;
    } else {
      alert(datold+" Day too long: "+sday+" "+sday.length);
      exit;
    }
  }
  if (datold != datnew) {
//    ACTIVATE FOR TEST RUNS
//    alert(datold+" --> "+datnew);
    item.setField('date', datnew);
  }
}
alert("Done!");
