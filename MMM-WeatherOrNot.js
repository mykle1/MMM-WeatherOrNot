/* Magic Mirror
 * Module: MMM-WeatherOrNot
 *
 * By Mykle1 - MIT Licensed
 *
 */

Module.register("MMM-WeatherOrNot",{

	defaults: {
		  languages: "",              // See language list
			tempUnits: "",              // us = F or uk for C
			textColor: "",              // Hex color codes.
			font: "",                   // See font list
			htColor: "",                // high temp color.  Hex color codes.
			ltColor: "",                // low temp color.  Hex color codes.
			sunColor: "",               // Hex color codes.
      moonColor: "",              // Hex color codes.
      cloudColor: "",             // Hex color codes.
      cloudFill: "",              // Hex color codes.
      rainColor: "",              // Hex color codes.
      snowColor: "",              // Hex color codes.
			height: "",                 // module is responsive to changes
			width: "",                  // module is responsive to changes
			location: "",               // See instructions for location
			locationCode: "",           // See instructions for locationCode
			label: "",                  // Location seems logical . .
			label2: "",                 // . . or anything you like
			days: "",                   // 3, 5 or 7
			theme: "",                  // dark or random_grey. bgColor MUST be empty - ""
			bgColor: "",                // theme overrides bgColor
			icons: "",                  // Iconvault, Climacons or Climacons Animated
			animationSpeed: 3000,
			updateInterval: 15 * 60 * 1000,
	},


	start: function () {
	self = this;

	// update timer
	setInterval(function() {
	self.updateDom(self.config.animationSpeed || 0);
	}, this.config.updateInterval);
},


	getStyles: function() {
        return ["MMM-WeatherOrNot.css"];
    },

	getDom: function() {


	var getTimeStamp = new Date().getTime(); // to seed url so Dom/module refreshes


		var iframe = document.createElement("IFRAME");
		iframe.classList.add("iframe");
		iframe.style = "border:none";
		iframe.scrolling = "no";
		iframe.style.height = this.config.height;
		iframe.style.width = this.config.width;


	 if (this.config.tempUnits === "F") {
		 this.config.tempUnits = "?unit=us";
	 }

	 if (this.config.tempUnits === "C") {
		 this.config.tempUnits = "";
	 }
      // theme overrides bgColor. One or the other but not both.
	 if (this.config.theme !== "" && this.config.bgColor !== "") {
		 this.config.bgColor = "";
	 }

    // Insert config options
		iframe.srcdoc = `<a class="weatherwidget-io" href="https://forecast7.com/${this.config.languages}/${this.config.locationCode}/${this.config.location}/${this.config.tempUnits}" data-label_1="${this.config.label}" data-label_2="${this.config.label2}" data-font="Roboto" data-icons="${this.config.icons}" data-days="${this.config.days}" data-theme="${this.config.theme}" data-basecolor="${this.config.bgColor}" data-textcolor="${this.config.textColor}" data-highcolor="${this.config.htColor}" data-lowcolor="${this.config.ltColor}" data-suncolor="${this.config.sunColor}" data-mooncolor="${this.config.moonColor}" data-cloudcolor="${this.config.cloudColor}" data-cloudfill="${this.config.cloudFill}" data-raincolor="${this.config.rainColor}" data-snowcolor="${this.config.snowColor}" ></a>
		<script>
		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
		</script>`  + '<font color="0,0,0,0">' + getTimeStamp + '</font>';

		return iframe;
	},

});
