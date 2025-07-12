document.addEventListener('DOMContentLoaded', function () {
  var dropdownToggle = document.querySelector('.nav-dropdown .dropdown-toggle');
  var dropdownList = document.querySelector('.nav-dropdown .dropdown-list');
  var dropdownWrapper = document.querySelector('.dropdown-wrapper');
  var closeLink = dropdownWrapper ? dropdownWrapper.querySelector('.link-2') : null;

  function closeDropdown() {
    if (dropdownList) {
      dropdownList.classList.remove('w--open');
    }
    if (dropdownWrapper) {
      dropdownWrapper.style.display = 'none';
    }
  }

  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', function (e) {
      e.preventDefault();
      var open = dropdownList.classList.toggle('w--open');
      if (dropdownWrapper) {
        dropdownWrapper.style.display = open ? 'flex' : 'none';
      }
    });
  }

  if (closeLink) {
    closeLink.addEventListener('click', function (e) {
      e.preventDefault();
      closeDropdown();
    });
  }

  document.addEventListener('click', function (e) {
    if (dropdownList && dropdownList.classList.contains('w--open')) {
      var target = e.target;
      if (!dropdownList.contains(target) && !dropdownToggle.contains(target) && !(dropdownWrapper && dropdownWrapper.contains(target))) {
        closeDropdown();
      }
    }
  });
});
