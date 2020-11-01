(function ($) {

	var flagAchievements = true, // indicator of achievements counter
		existAchievements = true, // if there is the achievements section on the page
		existScrollSpy = true, // if there is the scrollspy on the page
		flagMenu = false, // indicator of open/close menu
		flagPopupOpened = false, // indicator of open/close popup
		isMobile = false, // define the type of device
		flagPreloader = true, // indicator of show/hide preloader
		lastFocus; // last focus for popup accessibility

	function preloader() {
		$('.preloader__overlay').fadeOut('slow');
		flagPreloader = false;
	}

	function checkMobile() {
		var windowWidth = $(window).width();

		if (windowWidth > 992) {
			isMobile = false;
		} else {
			isMobile = true;
		}
	}

	function tooltip() {
		$.tooltipster.setDefaults({
			delay: 0,
			distance: 0,
			animationDuration: 200
		});

		if (isMobile) {
			// Because hover tooltips don't display correctly on mobile devices. Instead, for activation tooltips, there are using clicks
			// P.S. Of course, I can use custom trigger, but I'm so lazy for this shit
			$('.tooltip').tooltipster({
				side: "bottom",
				trigger: "click"
			});
			$('.tooltip-right').tooltipster({
				side: "right",
				trigger: "click"
			});
		} else {
			$('.tooltip').tooltipster({
				side: "bottom"
			});
			$('.tooltip-right').tooltipster({
				side: "right"
			});
		}
	}

	function flatpickr() {
		$('#service-date, #apply-date').flatpickr({
			"locale": "ru",
			enableTime: true,
			time_24hr: true,
			minDate: "today",
			minTime: "9:00",
			maxTime: "18:00",
			"disable": [
				function(date) {
					return (date.getDay() === 0 || date.getDay() === 6);
				}
			],
		});
	}

	function pageTransition() {
		$(document).on('click', 'a.trs', function (e) {
			e.preventDefault();

			var linkLocation = this.href;

			$('body').fadeOut(300, function () {
				window.location = linkLocation;
			});
		});
	}

	function scrollUp() {
		$(document).on('click', '.scrollup', function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800)
		});
	}

	function scrollUpButton() {
		var scrollButton = $('.scrollup');

		if ($(window).scrollTop() >= 300) {
			scrollButton.fadeIn();
		} else {
			scrollButton.fadeOut();
		}
	}

	function scrollIndicator() {
		var pageHeight = $(document).height(),
			currentPosition = $(window).scrollTop(),
			windowHeight = $(window).height(),
			scrollLimit = pageHeight - windowHeight,
			scrollPercents = currentPosition / (scrollLimit / 100);

		$('.scroll-indicator').width(scrollPercents + '%');
	}

	function fixedMenu() {
		var menu = $('.header-nav__wrapper'),
			menuHeight = menu.height(),
			header = $('.header-top__wrapper'),
			headerHeight = header.innerHeight();

		if ($(window).scrollTop() > headerHeight) {
			menu.addClass('fixed');
			header.css('margin-bottom', menuHeight);
		} else {
			menu.removeClass('fixed');
			header.css('margin-bottom', '0');
		}
	}

	function brandsCarousel() {
		$('.brands-carousel').slick({
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			arrows: false,
			// dots: true,
			responsive: [{
					breakpoint: 940,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4,
						dots: true
					}
				},
				{
					breakpoint: 756,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						dots: true
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						dots: true
					}
				},
				{
					breakpoint: 384,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: true
					}
				}
			]
		});
	}

	function reviewsCarousel() {
		$('.reviews-carousel').slick({
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 3,
			arrows: false,
			dots: true,
			responsive: [{
					breakpoint: 841,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 577,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});
	}

	function phoneMask() {

		var inputs = [];

		inputs.forEach.call(document.querySelectorAll('.js__mask'), function (input) {
			function mask(event) {

				var matrix = "+7 (___) ___-__-__",
					i = 0,
					def = matrix.replace(/\D/g, ""), // default
					value = this.value.replace(/\D/g, ""); // user value

				if (def.length >= value.length) {
					value = def;
				}

				this.value = matrix.replace(/./g, function (a) {
					return /[_\d]/.test(a) && i < value.length ? value.charAt(i++) : i >= value.length ? "" : a
				});

				if (event.type == 'blur' && this.value.length == 2) {
					this.value = ''
				}
			}
			input.addEventListener("input", mask, false);
			input.addEventListener("focus", mask, false);
			input.addEventListener("blur", mask, false);
		});
	}

	function toggleTabs() {

		var flag = true;

		$(document).on('click', '.place__tabs-button', function () {
			var
				$this = $(this),
				buttonData = $this.attr('data-tab'),
				content = $('.place__tabs-content'),
				items = content.find('.place__tabs-item'),
				activeItem = items.filter('.active'),
				targetItem = items.filter('[data-tab="' + buttonData + '"]');

			if ($this.hasClass('active') || !flag) {
				return; // Return if tabs are now animated or tab button is already active
			} else {
				flag = false;

				$('.place__tabs-button.active').removeClass('active');
				$this.addClass('active');

				activeItem.removeClass('show');
				setTimeout(function () {
					activeItem.removeClass('active');
					targetItem.addClass('active')
					setTimeout(function () {
						targetItem.addClass('show');
						flag = true;
					}, 50);
				}, 200);
			}

		});
	}

	function scrollTo() {
		$(document).on('click', '.scrollto', function (e) {
			e.preventDefault();
			var
				element = $(this).attr('href'),
				destination = $(element).offset().top - 110;

			$('body,html').animate({
				scrollTop: destination
			}, 900)
		});
	}

	function symbolscounter() {

		var counter = $('#js__symbols-counter'),
			textarea = $('.js__count-area'),
			max_symbols = 1000;

		if (textarea.length > 0) {
			$(document).on('blur, input', textarea, function(){

				var val = textarea.val(),
					length = val.length;

				counter.html(length);
				if ( length >= max_symbols ) {
					counter.addClass('warning');
				} else {
					counter.removeClass('warning');
				}
			});
		} else {
			return;
		}

	}

	var achievements = {

		init: function () {
			this.flagCheck();
		},

		flagCheck: function () {
			if (!flagAchievements || !existAchievements || !flagPreloader) {
				return;
			} else {
				this.existenceElement();
			}
		},

		existenceElement: function () {
			var element = $('.achievements');

			if ($(element).length == 0) {
				existAchievements = false;
				return;
			} else {
				this.events(element);
			}
		},

		events: function (element) {
			var scrollEvent = ($(window).scrollTop() > element.position().top - $(window).height());

			// When section achievements placed on the first screen
			var whenFirstScreen = (element.position().top < $(window).height());

			if (scrollEvent || whenFirstScreen) {
				flagAchievements = false; // Disable calculation's repeat
				this.elementsList();
			}
		},

		elementsList: function () {
			this.counter($(".achievements__years"), 15);
			this.counter($(".achievements__clients"), 1829);
			this.counter($(".achievements__percents"), 87);
		},

		counter: function (element, number) {
			$({numberValue: 0}).animate({
				numberValue: number
			}, {
				duration: 2000,
				easing: "linear",
				step: function (val) {
					$(element).html(Math.ceil(val));
				}
			});
		}

	}

	var popup = {

		init: function () {
			this.listeners();
		},

		listeners: function () {
			$(document).on('click', '.js__popup', popup.defineTypePopup);

			$(document).on('click', '.popup__close', popup.close);

			$(document).on('click', '.popup-overlay', function (e) {
				if ($(e.target).hasClass('popup-overlay')) {
					popup.close();
				}
			});

			$(document).keydown(function (e) {
				if (e.keyCode === 27 && flagPopupOpened) {
					e.stopPropagation();
					popup.close();
				}
			});
		},

		defineTypePopup: function (e) {
			e.preventDefault();

			var
				$this = $(this),
				name = $this.attr('data-popup');

			if (name == "service") {
				var service = $this.html();
			}
			popup.open(name, service);
		},

		open: function (name, service) {

			var popup = $('#popup-' + name);

			lastFocus = document.activeElement; // define last focus before opening the popup

			popup.wrap("<div class='popup-overlay'></div>");
			if (service) {
				popup.find('#service-type').val(service);
			}

			var overlay = $('.popup-overlay');

			overlay.addClass('open');
			setTimeout(function () {
				overlay.addClass('show');
				$('body').addClass('popup-opened');

				setTimeout(function () {
					popup.addClass('open');

					setTimeout(function () {
						popup
							.find('.popup__wrapper')
							.addClass('show')
							.find('h5')
							.focus();
					}, 50);
				}, 300);
			}, 50);

			flagPopupOpened = true;
		},

		close: function () {
			var
				popup = $('.popup'),
				overlay = $('.popup-overlay');

			popup
				.find('.popup__wrapper')
				.removeClass('show');

			setTimeout(function () {
				popup.removeClass('open');
				overlay.removeClass('show');
				$('body').removeClass('popup-opened');

				setTimeout(function () {
					overlay.removeClass('open');
					popup.unwrap();
				}, 300);
			}, 300);

			flagPopupOpened = false;
			lastFocus.focus(); // back to the last focus after closing the popup
		}
	}

	var tooggleMenu = {

		init: function () {
			this.listeners();
		},

		listeners: function () {
			$(document).on('click', '.open-menu', tooggleMenu.openMenu);
			$(document).on('click', '.mobile-nav__close, .overlay', tooggleMenu.closeMenu);
		},

		resize: function () {
			if (flagMenu && !isMobile) {
				tooggleMenu.closeMenu();
			}
		},

		openMenu: function () {
			var mobileNav = $('.mobile-nav');

			$('.overlay').fadeIn();
			mobileNav.addClass('visible')
			setTimeout(function () {
				mobileNav.addClass('open');
			}, 50);

			flagMenu = true;
		},

		closeMenu: function () {
			var mobileNav = $('.mobile-nav');

			mobileNav.removeClass('open');
			$('.overlay').fadeOut();
			setTimeout(function () {
				mobileNav.removeClass('visible')
			}, 500);

			flagMenu = false;
		}
	}

	var forms = {

		init: function () {
			this.modules();
			this.listeners();
		},

		modules: function () {

		},

		listeners: function () {
			$(document).on('submit', '.form', this.submitForm);
			$(document).on('focus', '.form input, .form textarea', this.removeError);
		},

		submitForm: function (e) {
			e.preventDefault();

			var form = $(this),
				submitButton = form.find('button[type="submit"]'),
				formData = new FormData(form[0]),
				formName = form.attr('name'),
				url;
			
			if (forms.validateForm(form) === false) return false;

			switch (formName) {
				case 'callback':
					url = "assets/php/callback.php";
					break;
				case 'apply':
					url = "assets/php/apply.php";
					break;
				case 'service':
					url = "assets/php/service.php";
					break;
				case 'advice':
					url = "assets/php/advice.php";
					break;
				case 'contacts':
					url = "assets/php/contacts.php";
					break;
				case 'spares':
					url = "assets/php/spares.php";
					break;
				case 'question':
					url = "assets/php/question.php";
					break;
				default:
					url = "";
					break;
			}

			$.ajax({
				type: "POST",
				url: url,
				data: formData,
				processData: false,
				contentType: false,

				beforeSend: function () {
					if (flagPopupOpened) {
						var coverArea = form.parents('.popup__wrapper');
					} else if (form.attr('name') == 'apply') {
						var coverArea = form.parents('.banner__right');
					} else {
						var coverArea = form;
					}

					submitButton.attr('disabled', 'disabled');
					$(	'<div class="popup__cover">'
					+		'<div class="preloader"></div>'
					+	'</div>').appendTo(coverArea).fadeIn();
				},

				error: function () {
					setTimeout(function () {
						$('.popup__cover').fadeOut();
						setTimeout(function() {
							$('.popup__cover').remove();
							submitButton
								.removeAttr('disabled')
								.parents('.form__submit')
								.append('<p class="form__submit-error">Ошибка. Попробуйте отправить снова</p>');
						}, 200);
					}, 500);
				},

				success: function (response) {
					if (flagPopupOpened) {
						$('.popup__wrapper').removeClass('show');
						setTimeout(function () {
							$('.popup').removeClass('open');
							popup.open("success");
						}, 300);
					} else {
						popup.open("success");
					}

					$('.popup__cover').fadeOut();
					setTimeout(function() {
						$('.popup__cover').remove();
						submitButton.removeAttr('disabled');
					}, 200);

					form.val('');
					form.trigger('reset');
				}
			});
		},

		validateForm: function (form) {
			var valid = true,
				inputs = form.find('input, textarea');

			$('.form__submit-error').remove();

			$.each(inputs, function (index, elem) {
				var input = $(elem),
					type = input.attr('type'),
					field = input.attr('name');

					// Remove notify error
					if (input.hasClass('has-error')) {
						var notify = input.siblings('.form__error-notify');

						input.removeClass('has-error');
						notify.remove();
					}

				switch (field) {
					case 'name':
						var pattern = /^[а-яА-ЯёЁa-zA-Z\D]{2,40}$/,
							textError = 'Поле должно состоять из букв (от 2 до 40)';

						if (forms.checkError(input, textError, pattern) === false) valid = false;
						break;

					case 'phone':
						var pattern = /\+7\s[\(][0-9]{3}[\)]\s\d{3}[-]\d{2}[-]\d{2}/g,
							textError = 'Введите номер в формате: +7 (XXX) XXX-XX-XX';

						if (forms.checkError(input, textError, pattern) === false) valid = false;
						break;

					case 'message':
						var pattern = /^[\s\S]{20,1000}$/,
							textError = 'Текст должен содержать от 20 до 1000 символов';

						if (forms.checkError(input, textError, pattern) === false) valid = false;
						break;

					case 'type':
						var textError = 'Введите название услуги';

						if (forms.checkError(input, textError) === false) valid = false;
						break;

					case 'date':
						var textError = 'Укажите удобные вам дату и время';

						if (forms.checkError(input, textError) === false) valid = false;
						break;

					case 'vin':
						var pattern = /^[A-Z0-9]{13}\d{4}$/,
							textError = 'Введите корректный VIN-код';

						if (forms.checkError(input, textError, pattern) === false) valid = false;
						break;

					case 'spare':
						var pattern = /^[\s\S]{1,100}$/,
							textError = 'Введите название запчасти (не более 100 символов)';

						if (forms.checkError(input, textError, pattern) === false) valid = false;
						break;

					case 'email':
						var pattern = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
						textError = 'Введите корректный адрес эл. почты';

						if (forms.checkError(input, textError, pattern) === false) valid = false;
						break;
					default:
						break;
				}

				if (type == 'checkbox' && !(input).prop('checked')) {
					textError = 'Чтобы продолжить, установите этот флажок';
					valid = false;
					forms.showError(input, textError);
				}
			});

			return valid;
		},

		checkError: function (input, textError, pattern) {
			var val = input.val();

			if (pattern && !pattern.test(val)) {
				forms.showError(input, textError);
				return false;
			} else if (val.length === 0) {
				forms.showError(input, textError);
				return false;
			}
		},

		showError: function (element, textError) {
			var formItem = element.parents('.form__item');

			formItem.append('<p class="form__error-notify">' + textError + '</p>');
			element.addClass('has-error');
		},

		removeError: function () {
			var $this = $(this),
				notify = $this.siblings('.form__error-notify');

			$this.removeClass('has-error');
			notify.remove();
		}

	}

	var fileAttachment = {

		init: function () {
			this.listeners();
		},

		listeners: function () {
			$(document).on('focus', '.form__file', this.addFocus);
			$(document).on('blur', '.form__file', this.removeFocus);
			$(document).on('dragover dragenter', '#js__dropzone', this.addDrag);
			$(document).on('dragleave dragend drop', '#js__dropzone', this.removeDrag);
			$(document).on('change', '#js__dropzone input', this.checkFile);
			$(document).on('click', '#js__removefile', this.removeFile);
		},

		addFocus: function () {
			$('#js__dropzone').addClass('focused');
		},

		removeFocus: function () {
			$('#js__dropzone').removeClass('focused');
		},

		addDrag: function () {
			$('#js__dropzone').addClass('dragover');
		},

		removeDrag: function () {
			$('#js__dropzone').removeClass('dragover');
		},

		checkFile: function () {
			var $this = $(this);

			// In first we need check the file size
			if (window.FileReader) {
				// doing this check only if we can get information about the file size
				// Yes, I mean browsers support
				if (fileAttachment.checkFileSize($this) == false) {
					var textError = 'Размер файла не должен превышать 5 Мбайт';

					fileAttachment.showError(textError);
					return;
				};
			}
			// Then we need check the file extension
			if (fileAttachment.checkFileExt($this) == false) {
				var textError = 'Добавляйте только изображения формата .png, .jpeg, .gif, .jpg';

				fileAttachment.showError(textError);
				return;
			} else { // success adding attachment
				$('#js__uploadresult')
					.html('Файл успешно добавлен!')
					.removeClass('error')
					.addClass('success');

				fileAttachment.showFileName($this);
				$('#js__removefile').addClass('show');
			};
		},

		checkFileSize: function($this) {
			var fileSize = $this[0].files[0].size,
				maxSize = 5242880, // 5 megabytes
				valid;

			if (fileSize > maxSize) {
				valid = false;
			} else {
				valid = true;
			};

			return valid;

		},

		checkFileExt: function ($this) {
			var filesExt = ['jpg', 'gif', 'png', 'jpeg', 'JPG', 'GIF', 'PNG', 'JPEG'],
				parts = $this.val().split('.'),
				valid;

			if (filesExt.join().search(parts[parts.length - 1]) != -1) {
				valid = true;
			} else {
				valid = false;
			};

			return valid;
		},

		showFileName: function ($this) {
			var filePath = $this.val();

			if (filePath.lastIndexOf('\\')) {
				var i = filePath.lastIndexOf('\\') + 1;
			} else {
				var i = filePath.lastIndexOf('/') + 1;
			}
			$('#js__filelabel').html(filePath.slice(i));
		},

		showError: function (textError) {
			$('#js__filelabel').html('');
			$('#js__uploadresult')
				.html(textError)
				.removeClass('success')
				.addClass('error');
			$('#js__dropzone input').val('');
			$('#js__removefile').removeClass('show');
		},

		removeFile: function (e) {
			e.preventDefault();
			$('#js__filelabel').html('');
			$('#js__uploadresult')
				.html('')
				.removeClass('success');
			$('#js__dropzone input').val('');
			$(this).removeClass('show');
		}

	}

	var scrollSpy = {

		navLinks: $('.services-nav__link'),
		sections: $('.services h5'),

		init: function () {
			this.flagCheck();
			this.listeners();
		},

		flagCheck: function () {
			if (isMobile || !existScrollSpy) {
				return;
			} else {
				this.existenceElement();
			}
		},

		listeners: function () {
			$(document).on('click', '.services-nav__link', this.scrollToSection);
		},

		existenceElement: function () {
			if (scrollSpy.sections.length == 0) {
				existScrollSpy = false;
				return;
			} else {
				this.navMarker();
			}
		},

		scrollToSection: function (e) {
			e.preventDefault();

			var sectionID = $(this).attr('href');
				section = $('#' + sectionID);
				destination = $(section).offset().top - 55;

			$('body,html').stop().animate({
				scrollTop: destination
			}, 500);
		},

		navMarker: function () {

			var currentScrollPosition = $(window).scrollTop() + 120;

			scrollSpy.sections.each(function() {
				
				var self = $(this);

				if (self.offset().top < currentScrollPosition) {

					var id = self.attr('id');

					scrollSpy.navLinks.removeClass('active');
					$('.services-nav__link[href="' + id +'"]').addClass('active');
				}
			});
		}

	}

	var accordion = {
		wrapper: $('.services'),
		headers: $('.services > h5'),
		lists: $('.services > ul'),
		flagAccordion: true,

		init: function () {
			this.listeners();
			this.resize();
		},

		listeners: function  () {
			$(document).on('click', '.services > h5', function () {
				accordion.toggleAccordion($(this));
			});
			$('.services > h5').keyup(function(event) {
				if (event.keyCode === 13 && isMobile) {
					accordion.toggleAccordion($(this));
				}
			});
		},

		toggleAccordion: function (element) {
			var $this = element;

			if ($this.hasClass('active')) {
				$this
					.removeClass('active')
					.next()
					.slideUp();
			} else {
				$this
					.addClass('active')
					.next()
					.slideDown();
			}
			
		},

		resize: function () {
			if (isMobile && accordion.flagAccordion) {
				this.showAccordion()
				accordion.flagAccordion = false;
			} else if (!isMobile) {
				this.hideAccordion();
				accordion.flagAccordion = true;
			}
		},

		showAccordion: function () {
			accordion.headers
				.attr('role', 'button')
				.attr('tabindex', '0')
				.filter(':first')
				.addClass('active');
				
			accordion.lists
				.filter(':not(:first)')
				.slideUp();
		},

		hideAccordion: function () {
			accordion.headers
				.removeAttr('role')
				.removeAttr('tabindex')
				.removeClass('active');
			
			accordion.lists
				.slideDown();
		}
	}

	$(window).on('load', function() {
		preloader();
	});
	$(document).ready(function () {
		svg4everybody();
		checkMobile();
		tooltip();
		flatpickr();
		brandsCarousel();
		reviewsCarousel();
		pageTransition();
		scrollUp();
		phoneMask();
		toggleTabs();
		scrollTo();
		symbolscounter();
		achievements.init();
		popup.init();
		tooggleMenu.init();
		forms.init();
		fileAttachment.init();
		scrollSpy.init();
		accordion.init();
	});

	$(window).scroll(function () {
		scrollUpButton();
		scrollIndicator();
		fixedMenu();
		achievements.flagCheck();
		scrollSpy.flagCheck();
	});

	$(window).resize(function () {
		checkMobile();
		scrollIndicator();
		tooggleMenu.resize();
		accordion.resize();
	});
	

})(jQuery);