var javaGen = angular.module('javaGen',[]);
javaGen.controller('formCtrl', function($scope,$http) {

  $scope.stepCount = 1;
  $scope.chapter = "test";
  $scope.program = "";
  $scope.filename = "";
  $scope.author = "";
  $scope.problemStatement = "";
  $scope.stepNumber = 1;
  $scope.overallPlan = [];
  $scope.classPurpose = "";
  $scope.dataDictionary = [];
  $scope.finished = false;
  $scope.nameTabs = [];
  $scope.typeTabs = [];
  $scope.valueRangeTabs = [];
  $scope.currentDate = new Date();

  $scope.currentUser = "";

  var userName = Cookies.get('userName');
  if(userName != "" && userName != null)
  {
      $scope.currentUser = userName;
  }

  $scope.checkCookie = function() {
    var userName = Cookies.get('userName');
    if(userName != "" && userName != null)
    {
        $scope.currentUser = userName;
        alert("Welcome "+$scope.currentUser +"!");
    }
  }

  $scope.getNumber = function(num){
    return new Array(num);
  }

  $scope.form1Submit = function() {
    $scope.chapter = $("input[name='chapter']").val();
    $scope.program = $("input[name='program']").val();
    $scope.filename = $("input[name='filename']").val();
    $scope.author = $("input[name='author']").val();
    $scope.problemStatement = $("input[name='problemStatement']").val();
    $("#form1").fadeOut();
    $("#overallPlan").fadeIn();
    $scope.stepCount++;
    $("#p1").toggle();
    $("#p2").toggle();
  }

  $scope.addStepToOverallPlan = function() {
    $("input[name='plan"+$scope.stepNumber+"']").after(
      "<label for='plan"+($scope.stepNumber+1)+"'>"+($scope.stepNumber+1)+": </label><input type='text'' name='plan"+($scope.stepNumber+1)+"' id='plan"+($scope.stepNumber+1)+"-input'>");
      $scope.stepNumber++;
  }

  $scope.overallPlanSubmit = function() {
        $("#overallPlan").fadeOut();
        $("#classes").fadeIn();
        for(var x = 1; x <= $scope.stepNumber; x++)
        {
          $scope.overallPlan.push($("input#plan"+x+"-input").val());
        }
        $scope.stepCount++;
  }

  $scope.classesSubmit = function() {
    $("#classes").fadeOut();
    $("#dataDictionary").fadeIn();
    $scope.classPurpose= $("input[name='classPurpose1']").val();
    $scope.stepCount++;
  }

  $scope.overallPlanBack = function() {
    $("#overallPlan").fadeOut();
    $("#form1").fadeIn();
  }

  $scope.classesBack = function() {
    $("#classes").fadeOut();
    $("#overallPlan").fadeIn();
  }

  $scope.dataDictionaryBack = function() {
    $("#dataDictionary").fadeOut();
    $("#classes").fadeIn();
  }

  $scope.dataDictionaryPush = function() {
    var variable = {
      name: $("input[name='nameDictionary']").val(),
      typeDictionary: $("input[name='type']").val(),
      valueRange: $("input[name='valueRange']").val(),
      description: $("textarea[name='descriptionDictionary']").val(),
    }
    if((16 - variable.name.length) % 4.0 == 0)
    {
      var nameTabs = Math.floor((16 - variable.name.length) / 4);
    }
    else {
      var nameTabs = Math.floor((16 - variable.name.length) / 4) + 1;
    }
    if((12 - variable.typeDictionary.length) % 4.0 == 0)
    {
      var typeTabs = Math.floor((12 - variable.typeDictionary.length) / 4);
    }
    else {
      var typeTabs = Math.floor((12 - variable.typeDictionary.length) / 4) + 1;
    }
    if((16 - variable.valueRange.length) % 4.0 == 0)
    {
      var valueRangeTabs = Math.floor((16- variable.valueRange.length) / 4);
    }
    else {
      var valueRangeTabs = Math.floor((16- variable.valueRange.length) / 4) + 1;
    }
    variable.nameTabs = nameTabs;
    variable.typeTabs = typeTabs;
    variable.valueRangeTabs = valueRangeTabs;
    $scope.dataDictionary.push(variable);
    $("input[name='nameDictionary']").val("");
    $("input[name='type']").val("");
    $("input[name='valueRange']").val("");
    $("textarea[name='descriptionDictionary']").val("");
  }

  // compare function to alphabetize the data dictionary
  $scope.compare = function(a,b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  $scope.gotoResult = function() {
      if($scope.currentUser == "") {
        $("#p3").show();
      }
      else {
        $("#p3a").show();
      }
      $scope.dataDictionary.sort($scope.compare);
    // set up the final output for the text area
    var displayText = "/* Chapter No. "+$scope.chapter+" Program No. "+$scope.program;
    displayText += "\nFile Name:\t\t\t" + $scope.filename;
    if($scope.currentUser != "")
    {
    displayText += "\nAuthor:\t\t\t\t" + $scope.currentUser;
    }
    else
    {
      displayText += "\nAuthor:\t\t\t\t" + $scope.author;
    }
    displayText += "\nDate Modified:\t\t" + ($scope.currentDate.getMonth()+1) + "/" + $scope.currentDate.getDate() + "/" + $scope.currentDate.getFullYear();
    displayText += "\n\nProblem Statement: " + $scope.problemStatement;
    displayText += "\n\nOverall Plan:\n";
    for(var b = 0; b < $scope.overallPlan.length; b++)
    {
      displayText += (b+1) + ". " + $scope.overallPlan[b] + "\n";
    }
    displayText += "\nClasses needed and Purpose (Input, Processing, Output)\nmain class - ";
    displayText += $scope.classPurpose + "\n";
    displayText += "\n\nDATA DICTIONARY\n";
    displayText += "---- ---------\n";
    displayText += "NAME\t\t\tTYPE\t\tVALUE/RANGE\t\tDESCRIPTION\n";
    displayText += "====\t\t\t====\t\t==========\t\t==========\n";
    for(var x = 0; x < $scope.dataDictionary.length; x++)
    {
      displayText += $scope.dataDictionary[x].name;
      for(var y = 0; y < $scope.dataDictionary[x].nameTabs; y++)
      {
        displayText += "\t";
      }
      displayText += $scope.dataDictionary[x].typeDictionary;
      for(var z = 0; z < $scope.dataDictionary[x].typeTabs; z++)
      {
        displayText +="\t";
      }
      displayText += $scope.dataDictionary[x].valueRange;
      for(var n = 0; n < $scope.dataDictionary[x].valueRangeTabs; n++)
      {
        displayText +="\t";
      }
      displayText += $scope.dataDictionary[x].description + "\n";
    }
    displayText += "*/";
    $("#resultText").text(displayText);
    $("#dataDictionary").fadeOut();
    $("#result").fadeIn();
    $scope.stepCount++;
    $scope.finished = true;
  }

  $scope.settingsClick = function() {
    $("#settings-constant1").fadeIn();
    $("#settings-reset").fadeIn().css("display","inline-block");
    $("#settings-save").fadeIn().css("display","inline-block");
    $("#settings-cancel").fadeIn().css("display","inline-block");
    $("label[for='constant1']").fadeIn().css("display","block");
  }

  $scope.settingsSaveClick = function() {
    var nameInput = $("#settings-constant1").val();
    if(nameInput != "")
    {
      Cookies.set('userName', nameInput, { expires: 150 });
      $scope.currentUser = nameInput;
    }
    else
    {
        alert("Constants cannot be left blank!");
    }
    $("#settings-constant1").fadeOut();
    $("#settings-reset").fadeOut();
    $("#settings-save").fadeOut();
    $("#settings-cancel").fadeOut();
    $("label[for='constant1']").fadeOut();
  }

  $scope.settingsClose = function() {
    $("#settings-reset").fadeOut();
    $("#settings-constant1").fadeOut();
    $("#settings-save").fadeOut();
    $("#settings-cancel").fadeOut();
    $("#settings-constant1").val("");
    $("label[for='constant1']").fadeOut();
  }

  $scope.settingsReset = function() {
    Cookies.remove('userName');
    $("#settings-constant1").val("");
    $scope.currentUser = "";
  }

  $scope.copyText = function() {
    $("#resultText").select();
    try {
     var successful = document.execCommand('copy');
     var msg = successful ? 'successful' : 'unsuccessful';
     console.log('Copying text command was ' + msg);
   } catch (err) {
     console.log('Oops, unable to copy');
   }
   $("#copyMe").hide();
  $("#copied").show();
  }

});
