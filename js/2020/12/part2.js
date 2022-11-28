module.exports = (file) => {
	let lines = file.split('\n');

	lines = lines.map((line) => {
		let [, ins, unit] = line.match(/([A-Z])(\d+)/);

		return [ins, +unit];
	});

	let wx = 10;
	let wy = 1;
	let x = 0;
	let y = 0;

	let move = (ins, unit) => {
		switch (ins) {
			case 'N':
				wy += unit;
				break;
			case 'S':
				wy -= unit;
				break;
			case 'E':
				wx += unit;
				break;
			case 'W':
				wx -= unit;
				break;
			case 'L':
			case 'R':
				let r = unit;

				while (r > 0) {
					if (ins === 'R') {
						let twx = wx;
						wx = wy;
						wy = -twx;
					} else if (ins === 'L') {
						let twx = wx;
						wx = -wy;
						wy = twx;
					}

					r -= 90;
				}

				break;
			case 'F':
				y += unit * wy;
				x += unit * wx;
				break;
		}
	};

	for (let line of lines) {
		move(...line);
	}

	return Math.abs(x) + Math.abs(y);
};
