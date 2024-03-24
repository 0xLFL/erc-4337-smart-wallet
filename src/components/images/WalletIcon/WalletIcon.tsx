import React from 'react';

const WalletIcon = ({ color, width, height }: { color: string, width: string, height: string }) => {
  return (
    <div style={{ display: "flex", marginLeft: "-1px" }}>
      <svg version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet">

        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill={color} stroke="none">
        
        <path d="M3052 4895 c-18 -8 -183 -104 -366 -215 l-334 -200 -939 0 c-1033 0
        -1006 1 -1127 -62 -78 -41 -183 -146 -224 -224 -65 -125 -62 -31 -62 -1739 0
        -1715 -4 -1613 65 -1744 61 -116 180 -217 301 -257 57 -18 113 -19 2079 -19
        l2020 0 50 27 c60 32 114 87 146 148 24 44 24 52 27 357 l3 312 184 3 185 3
        27 28 28 27 3 673 c3 613 2 675 -14 704 -9 17 -24 35 -33 40 -9 4 -97 10 -196
        13 l-180 5 -5 310 c-5 303 -6 311 -29 359 -33 66 -91 122 -160 155 -54 25 -64
        26 -253 29 l-197 4 -3 311 c-3 303 -4 313 -26 355 -35 66 -88 119 -150 149
        -56 27 -61 28 -263 31 l-207 3 -113 196 c-63 108 -123 201 -134 209 -33 21
        -68 24 -103 9z m303 -755 l294 -505 -568 -3 c-313 -1 -829 -1 -1145 0 l-576 3
        842 507 c464 278 847 505 851 504 4 0 140 -228 302 -506z m-1370 121 c-6 -4
        -244 -149 -531 -320 l-521 -312 -244 3 c-232 3 -246 4 -291 26 -64 32 -125 94
        -154 156 -35 77 -36 183 -2 257 45 98 115 158 217 185 54 15 1541 20 1526 5z
        m1790 -5 c61 -26 66 -48 63 -296 l-3 -221 -150 257 c-82 142 -151 261 -153
        266 -6 14 206 9 243 -6z m-3465 -792 c106 -51 -12 -48 2115 -54 1095 -3 1997
        -9 2006 -13 8 -4 23 -21 32 -36 15 -26 17 -64 17 -309 l0 -281 -342 -3 -343
        -3 -80 -28 c-240 -84 -410 -261 -486 -507 -31 -97 -33 -290 -6 -390 57 -210
        209 -393 401 -485 137 -65 157 -68 524 -72 l333 -4 -3 -290 -3 -289 -28 -27
        -27 -28 -1983 0 -1982 0 -53 24 c-64 29 -143 112 -168 178 -18 46 -19 109 -22
        1362 l-2 1314 27 -19 c16 -10 48 -28 73 -40z m4598 -1436 l-3 -533 -520 0
        c-509 0 -521 0 -590 22 -229 72 -379 276 -378 513 0 97 12 149 55 236 69 142
        214 252 373 284 22 4 271 8 553 9 l512 1 -2 -532z"/>
        
        <path d="M3877 2339 c-59 -14 -116 -47 -163 -95 -117 -121 -111 -328 13 -445
        60 -57 117 -82 203 -87 60 -3 86 0 132 18 165 62 249 263 177 420 -48 103
        -112 158 -216 185 -63 17 -90 17 -146 4z m144 -238 c49 -50 36 -133 -26 -166
        -63 -35 -140 4 -152 78 -15 97 108 158 178 88z"/>

        </g>
      </svg>
    </div>
  );
};

export default WalletIcon;