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
      description: $("textarea[name='descriptionDictionary']").val()
    }
    if((16 - variable.name.length) % 4 == 0)
    {
      $scope.nameTabs.push(Math.floor((16 - variable.name.length) / 4));
    }
    else {
      $scope.nameTabs.push(Math.floor((16 - variable.name.length) / 4) + 1);
    }
    if((8 - variable.typeDictionary.length) % 4 == 0)
    {
      $scope.typeTabs.push(Math.floor((8 - variable.typeDictionary.length) / 4));
    }
    else {
      $scope.typeTabs.push(Math.floor((8 - variable.typeDictionary.length) / 4) + 1);
    }
    if((12 - variable.valueRange.length) % 4 == 0)
    {
      $scope.valueRangeTabs.push(Math.floor((12- variable.valueRange.length) / 4));
    }
    else {
      $scope.valueRangeTabs.push(Math.floor((12- variable.valueRange.length) / 4) + 1);
    }
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
    $scope.dataDictionary.sort($scope.compare);
    // set up the final output for the text area
    var displayText = "/* Chapter No. "+$scope.chapter+" Program No. "+$scope.program;
    displayText += "\nFile Name:\t\t\t " + $scope.filename;
    displayText += "\nAuthor:\t\t\t\t " + $scope.author;
    displayText += "\nDate Modified: ";
    displayText += "\n\nProblem Statement: " + $scope.problemStatement;
    displayText += "\n\nOverall Plan:\n";
    for(var b = 0; b < $scope.overallPlan.length; b++)
    {
      displayText += (b+1) + ". " + $scope.overallPlan[b] + "\n";
    }
    displayText += "\n\nDATA DICTIONARY\n";
    displayText += "---- ---------\n";
    displayText += "NAME\t\t\tTYPE\tVALUE/RANGE\tDESCRIPTION\n";
    displayText += "====\t\t\t====\t==========\t==========\n";
    for(var x = 0; x < $scope.dataDictionary.length; x++)
    {
      displayText += $scope.dataDictionary[x].name;
      for(var y = 0; y < $scope.nameTabs[x]; y++)
      {
        displayText += "\t";
      }
      displayText += $scope.dataDictionary[x].typeDictionary;
      for(var z = 0; z < $scope.typeTabs[x]; z++)
      {
        displayText +="\t";
      }
      displayText += $scope.dataDictionary[x].valueRange;
      for(var n = 0; n < $scope.valueRangeTabs[x]; n++)
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

});
