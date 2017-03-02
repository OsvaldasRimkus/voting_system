var React = require('react');
var ErrorWrapper = require('../components/tiny_components/ErrorWrapper');
var RootErrorWrapper = require('../components/tiny_components/RootErrorWrapper');

var Vars = {
    districtNameRegex: new RegExp(/^([a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\s\-][^qQwWxX0-9]*)$/),
    countyNameRegex: new RegExp(/^([a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ0-9\s\-][^qQwWxX]*)$/),
    partyNameRegex: new RegExp(/^([a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\s\-][^qQwWxX0-9]*)$/),
    min: 3,
    max: 40
};

var Validations = {
    checkErrorsPartyAsideForm: function(name, file) {
        var errors = [];

        if (name.length < Vars.min) errors.push("Partijos pavadinimas " + Errors.toShort);
        if (name.length > Vars.max) errors.push("Partijos pavadinimas " + Errors.toLong);
        if (!Vars.partyNameRegex.test(name)) errors.push(Errors.onlyAlphas);

        if (file == undefined) {
            errors.push(Errors.noFileError);
        } else {
            var extension = file.name.split(".").pop().toLowerCase();
            if (extension.localeCompare("csv") != 0) errors.push(Errors.csvOnly);
        }

        return errors;
    },
    checkErrorsDistrictAsideForm: function(name) {
        var errors = [];

        if (name.length < Vars.min) errors.push("Apygardos pavadinimas " + Errors.toShort);
        if (name.length > Vars.max) errors.push("Apygardos pavadinimas " + Errors.toLong);
        if (!Vars.districtNameRegex.test(name)) errors.push(Errors.onlyAlphas);

        return errors;
    },
    checkErrorsCountyForm: function(name, count, address) {
        var errors = [];

        if (name.length < Vars.min) errors.push("Apylinkės pavadinimas " + Errors.toShort);
        if (name.length > Vars.max) errors.push("Apylinkės pavadinimas " + Errors.toLong);
        if (!Vars.countyNameRegex.test(name)) errors.push(Errors.onlyAlphas);

        switch (true) {
            case (count == undefined):
              errors.push(Errors.popToLow + 0);
              break;
            case (count < 100):
              errors.push(Errors.popToLow + count);
              break;
            case (count > 3000000):
              errors.push(Errors.popToHigh + count);
              break;
        }

        if (address.length == 0) {
            errors.push("Adresas - " + Errors.blankField);
        } else {
            if (address.length < Vars.min) errors.push("Adresas " + Errors.toShort);
            if (address.length > Vars.max) errors.push("Adresas " + Errors.toLong);
        }

        return errors;
    },
    checkErrorsPartyMMform: function(dictionary) {
        var errors = [];
        var emptyFields = 0;

        dictionary.forEach(function(value) {
            if (value === "") {
                emptyFields += 1;
            } else if (isNaN(value)) {
                errors.push(value + " " + Errors.NaNerror);
            } else if (parseInt(value) < 0) {
                errors.push(value + " " + Errors.negativeNumError);
            } else if (parseInt(value) > 50000) {
                errors.push(value + " " + Errors.positiveInfiniteNumError);
            }
        });
        if (emptyFields > 0) errors.push(Errors.emptyFieldsError + "(" + emptyFields + ")");

        if (emptyFields == dictionary.size + 1) {
            var emptyForm = new Array();
            emptyForm.push(Errors.emptyFormError);
            errors = emptyForm;
        }

        return errors;
    },
    checkErrorsResultForm: function(dictionary, spoiled) {
        var errors = [];
        var emptyFields = 0;

        if (spoiled === "" || spoiled == undefined) {
            emptyFields += 1;
        } else if (isNaN(spoiled)) {
            errors.push(spoiled + " " + Errors.NaNerror);
        }
        if (parseInt(spoiled) < 0) {
            errors.push(spoiled + " " + Errors.negativeNumError);
        } else if (parseInt(spoiled) > 50000) {
            errors.push(value + " " + Errors.positiveInfiniteNumError);
        }

        dictionary.forEach(function(value) {
            if (value == "" || value == undefined) {
                emptyFields += 1;
            } else if (isNaN(value)) {
                errors.push(value + " " + Errors.NaNerror);
            } else if (parseInt(value) < 0) {
                errors.push(value + " " + Errors.negativeNumError);
            } else if (parseInt(value) > 50000) {
                errors.push(value + " " + Errors.positiveInfiniteNumError);
            }
        });
        if (emptyFields > 0) errors.push(Errors.emptyFieldsError + "(" + emptyFields + ")");
        if (emptyFields == dictionary.size + 1) {
            var emptyForm = new Array();
            emptyForm.push(Errors.emptyFormError);
            errors = emptyForm;
        }

        return errors;
    },
    validateCsv: function(file) {
      var errors = [];

      if (file == undefined) {
          errors.push(Errors.noFileError);
      } else {
          var extension = file.name.split(".").pop().toLowerCase();
          if (extension.localeCompare("csv") != 0) errors.push(Errors.csvOnly);
      }

      return errors;
    },
    prepareJSerrors: function(errors, root_message, style) {
        var preparedErrors = [];
        for (var i = 0; i < errors.length; i++) {
            preparedErrors.push(<ErrorWrapper message={errors[i]} key={i}/>);
        }
        return (
            <RootErrorWrapper message={root_message} key={errors.length} inlineStyle={style}>
                {preparedErrors}
            </RootErrorWrapper>
        );
    },
    prepareSpringErrors: function(errors, style) {
        var preparedErrors = [];
        for (var i = 1; i < errors.length; i++) {
            preparedErrors.push(<ErrorWrapper message={errors[i]} key={i}/>);
        }
        return (
            <RootErrorWrapper message={errors[0]} inlineStyle={style}>
                {preparedErrors}
            </RootErrorWrapper>
        );
    },
};

var Errors = {
    toShort: "per trumpas (min. " + Vars.min + " simbolių) - REACT",
    toLong: "per ilgas (min. " + Vars.max + " simbolių) - REACT",
    blankField: "tuščias laukas - REACT",
    onlyAlphas: "REACT - Pavadinimas neatitinka formato",
    popToLow: "REACT - Nerealiai mažai gyventojų - ",
    popToHigh: "REACT - Nerealiai daug gyventojų - ",
    noFileError: "REACT - Butina ikelti nariu sarasa",
    csvOnly: "REACT - Failas turi buti .csv",
    NaNerror: "yra ne skaičius - REACT",
    negativeNumError: "yra mažiau 0 - REACT",
    emptyValueError: "REACT - balsų įvedimo laukas liko tuščias",
    emptyFieldsError: "REACT - formoje liko tuščių laukų ",
    positiveInfiniteNumError: "nu kur tau matytas toks skaičius...",
    emptyFormError: "React - forma tuščia"
};

module.exports = Validations;
