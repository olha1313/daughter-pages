{
	class ImgItem {
		constructor(el) {
			this.DOM = {};
			this.DOM.el = el;
			this.DOM.svg = this.DOM.el.querySelector('.item__svg');
			this.DOM.path = this.DOM.svg.querySelector('path');
			this.paths = {};
			this.paths.start = this.DOM.path.getAttribute('d');
			this.paths.end = this.DOM.el.dataset.morphPath;
			this.DOM.image = this.DOM.svg.querySelector('image');
			this.CONFIG = {
				// Defaults:
				animation: {
					path: {
						duration: this.DOM.el.dataset.animationPathDuration || 1500,
						delay: this.DOM.el.dataset.animationPathDelay || 0,
						easing: this.DOM.el.dataset.animationPathEasing || 'easeOutElastic',
						elasticity: this.DOM.el.dataset.pathElasticity || 400,
						scaleX: this.DOM.el.dataset.pathScalex || 1,
						scaleY: this.DOM.el.dataset.pathScaley || 1,
						translateX: this.DOM.el.dataset.pathTranslatex || 0,
						translateY: this.DOM.el.dataset.pathTranslatey || 0,
						rotate: this.DOM.el.dataset.pathRotate || 0
					},
					image: {
						duration: this.DOM.el.dataset.animationImageDuration || 2000,
						delay: this.DOM.el.dataset.animationImageDelay || 0,
						easing: this.DOM.el.dataset.animationImageEasing || 'easeOutElastic',
						elasticity: this.DOM.el.dataset.imageElasticity || 400,
						scaleX: this.DOM.el.dataset.imageScalex || 1.1,
						scaleY: this.DOM.el.dataset.imageScaley || 1.1,
						translateX: this.DOM.el.dataset.imageTranslatex || 0,
						translateY: this.DOM.el.dataset.imageTranslatey || 0,
						rotate: this.DOM.el.dataset.imageRotate || 0
					}
				}
			};
			this.initEvents();
		}
		initEvents() {
			this.mouseenterFn = () => {
				this.mouseTimeout = setTimeout(() => {
					this.isActive = true;
					this.animate();
				}, 75);
			}
			this.mouseleaveFn = () => {
				clearTimeout(this.mouseTimeout);
				if( this.isActive ) {
					this.isActive = false;
					this.animate();
				}
			}
			this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
			this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
			this.DOM.el.addEventListener('touchstart', this.mouseenterFn);
			this.DOM.el.addEventListener('touchend', this.mouseleaveFn);
		}
		getAnimeObj(targetStr) {
			const target = this.DOM[targetStr];
			let animeOpts = {
				targets: target,
				duration: this.CONFIG.animation[targetStr].duration,
				delay: this.CONFIG.animation[targetStr].delay,
				easing: this.CONFIG.animation[targetStr].easing,
				elasticity: this.CONFIG.animation[targetStr].elasticity,
				scaleX: this.isActive ? this.CONFIG.animation[targetStr].scaleX : 1,
				scaleY: this.isActive ? this.CONFIG.animation[targetStr].scaleY : 1,
				translateX: this.isActive ? this.CONFIG.animation[targetStr].translateX : 0,
				translateY: this.isActive ? this.CONFIG.animation[targetStr].translateY : 0,
				rotate: this.isActive ? this.CONFIG.animation[targetStr].rotate : 0
			};
			if( targetStr === 'path' ) {
				animeOpts.d = this.isActive ? this.paths.end : this.paths.start;
			}
			anime.remove(target);
			return animeOpts;
		}
		animate() {
			// Animate the path, the image.
			anime(this.getAnimeObj('path'));
			anime(this.getAnimeObj('image'));
		}
	}

	const items = Array.from(document.querySelectorAll('.item'));
	const init = (() => items.forEach(item => new ImgItem(item)))();
	setTimeout(() => document.body.classList.remove('loading'), 2000);
};
