(function () {
  // clear console
  console.clear();

  // define vars
  var discTotal = 4,
    discs = [],
    discIndexs = [],
    columns = [],
    stacks = ['src', 'aux', 'dst'];

  /**
   * Create disc.
   *
   * @param discNumber Disc number
   * @returns {jQuery|HTMLElement}
   */
  var createDisc = function createDisc(discNumber) {
    var element = $('<div>');
    element.addClass('disc');
    element.css({'width': (discNumber * 20) + 'px'});
    element.text(discNumber);
    return element;
  }

  /**
   * Function to wait 1 second.
   *
   * @returns {Promise<any>}
   */
  var resolveAfter1Seconds = function resolveAfter1Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 1000);
    });
  }

  /**
   * Init data.
   */
  function init() {
    // init disc data
    for (var i = 0; i < discTotal; i++) {
      discIndexs.push(i);
      discs.push(i + 1);
      $('#column0').append(createDisc(i + 1));
    }

    // init columns data
    columns = [discs, [], []];
  }

  /**
   * Main function to move disc.
   *
   * @param disc Number of disc
   * @param indexFrom Index of colum that discs move from
   * @param indexTo Index of colum that disc move to
   * @returns {Promise<void>}
   */
  var hanoi = async function hanoi(disc, indexFrom, indexTo) {
    var indexOther = discIndexs.filter(function (v) {
      return [indexFrom, indexTo].indexOf(v) < 0;
    })[0];

    if (disc > 1) await hanoi(disc - 1, indexFrom, indexOther);

    var moveVal = columns[indexFrom].shift();
    columns[indexTo].unshift(moveVal);
    console.log('Move ' + moveVal + ' from ' + stacks[indexFrom] + ' to ' + stacks[indexTo]);
    await resolveAfter1Seconds();
    $('#column' + indexTo).prepend($('#column' + indexFrom + ' .disc').first());

    if (disc > 1) await hanoi(disc - 1, indexOther, indexTo);
  }

  // run
  init();
  hanoi(discTotal, 0, 2);
})();