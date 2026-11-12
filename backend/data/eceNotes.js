// ECE notes (Notes section ke 'ECE' tab ke liye) — saare 23 notes ek hi file mein.
// Ye file admin route /api/admin/seed-ece-notes se load hoti hai (routes/admin.js).
// Content HTML hai: sirf h2/h3/p/ul/li/pre/code/strong use hue hain (notes.html inhe hi style karta hai).
// <pre> ke andar Verilog/C code mein < > & ko &lt; &gt; &amp; likha hai aur backtick ko &#96; (template literal safe).
// Groups: 1-4 Circuits+Analog | 5-9 Digital, Signals, DSP, Control | 10-14 EM + Communication
//         15-16 Microprocessor + Embedded | 17-22 VLSI series | 23 Core ECE revision
module.exports = [
{
  title: 'Network Theory — Laws, Theorems, Transients & Resonance',
  category: 'ECE', order: 1,
  description: 'KCL/KVL, all network theorems, RC/RL/RLC transients, resonance, two-port parameters',
  tags: ['Network Theory','Thevenin','Transient','Resonance','Two-Port','Circuits'],
  content: `<h2>Network Theory — Complete Revision</h2>
<h3>1. Basic Laws</h3>
<ul>
<li><strong>KCL:</strong> sum of currents at a node = 0 (conservation of charge). Independent KCL equations = n − 1 (n = nodes).</li>
<li><strong>KVL:</strong> sum of voltages around a closed loop = 0 (conservation of energy). Independent loops = b − n + 1 (b = branches).</li>
<li><strong>Voltage divider:</strong> V1 = Vs·R1/(R1+R2). <strong>Current divider:</strong> I1 = Is·R2/(R1+R2).</li>
<li>Series: R add, C combine like parallel resistors. Parallel: G add, C add.</li>
</ul>

<h3>2. Network Theorems</h3>
<ul>
<li><strong>Superposition:</strong> only for linear circuits. Turn off other sources (voltage source → short, current source → open). Cannot be applied to power directly.</li>
<li><strong>Thevenin:</strong> any linear network = Vth in series with Rth. Vth = open-circuit voltage, Rth = resistance seen with independent sources off. With dependent sources use Rth = Voc / Isc.</li>
<li><strong>Norton:</strong> IN = short-circuit current, RN = Rth. Vth = IN·Rth.</li>
<li><strong>Maximum power transfer:</strong> RL = Rth gives Pmax = Vth² / (4·Rth), efficiency 50%. For AC: ZL = Zth* (complex conjugate).</li>
<li><strong>Reciprocity:</strong> only for linear, bilateral, single-source networks with no dependent sources. <strong>Tellegen:</strong> sum of instantaneous power in all branches = 0. <strong>Millman:</strong> V = (ΣVi·Gi)/(ΣGi).</li>
</ul>

<h3>3. Transient Analysis</h3>
<p>Capacitor voltage and inductor current cannot change instantaneously. At t = 0+, uncharged C acts as a short and an inductor with zero current acts as an open circuit. In DC steady state, C = open and L = short.</p>
<pre>General first-order response (three-element method):
x(t) = x(∞) + [x(0+) − x(∞)] · e^(−t/τ)

RC circuit: τ = R·C    vc(t) = Vs(1 − e^(−t/RC))  (charging)
RL circuit: τ = L/R    i(t)  = (Vs/R)(1 − e^(−t·R/L))
After 5τ the response is ~99.3% complete.</pre>
<h3>Series RLC (second order)</h3>
<pre>α = R/(2L)      ω0 = 1/√(LC)      ζ = α/ω0
Overdamped  : α &gt; ω0  (two real roots)
Critically  : α = ω0  (fastest without oscillation)
Underdamped : α &lt; ω0  (oscillates at ωd = √(ω0² − α²))</pre>

<h3>4. AC Circuits & Resonance</h3>
<ul>
<li>Impedance: R, jωL, 1/(jωC). Real power P = Vrms·Irms·cos φ, reactive Q = VI sin φ, apparent S = VI. Power factor = cos φ.</li>
<li><strong>Series resonance:</strong> ω0 = 1/√(LC); impedance minimum (= R); current maximum; Q = ω0L/R = 1/(ω0CR); bandwidth BW = ω0/Q = R/L.</li>
<li><strong>Parallel resonance:</strong> impedance maximum; Q = R/(ω0L) = ω0RC; current from source minimum.</li>
<li>Half-power frequencies are where the magnitude falls to 1/√2 (−3 dB).</li>
</ul>

<h3>5. Two-Port Networks</h3>
<pre>Z-parameters : V1 = Z11 I1 + Z12 I2 ; V2 = Z21 I1 + Z22 I2
Y-parameters : I1 = Y11 V1 + Y12 V2 ; I2 = Y21 V1 + Y22 V2
ABCD (transmission): V1 = A V2 − B I2 ; I1 = C V2 − D I2
h-parameters : V1 = h11 I1 + h12 V2 ; I2 = h21 I1 + h22 V2

Reciprocal network : Z12 = Z21, Y12 = Y21, AD − BC = 1, h12 = −h21
Symmetrical network: Z11 = Z22, A = D
Cascade connection : multiply ABCD matrices. Series: add Z. Parallel: add Y.</pre>

<h3>6. Quick Formulas & Interview Points</h3>
<ul>
<li>RC low-pass cutoff: fc = 1/(2πRC). Time constant of RC high-pass is the same.</li>
<li>Inductor energy = ½·L·I², capacitor energy = ½·C·V².</li>
<li>Star-delta: delta resistance = (sum of products of star pairs) / opposite star resistor; for equal values R∆ = 3·RY.</li>
<li>Why is Thevenin useful? It reduces a complex network to a 2-element model for load analysis.</li>
</ul>`
},
{
  title: 'Semiconductor Devices & Diode Circuits',
  category: 'ECE', order: 2,
  description: 'Semiconductor physics, PN junction, special diodes, rectifiers, clippers, Zener regulator',
  tags: ['Semiconductor','PN Junction','Diode','Rectifier','Zener','Electronic Devices'],
  content: `<h2>Semiconductor Devices & Diodes</h2>
<h3>1. Semiconductor Physics</h3>
<ul>
<li>Band gap at 300 K: Si ≈ 1.12 eV, Ge ≈ 0.67 eV, GaAs ≈ 1.43 eV. Intrinsic carrier concentration of Si ≈ 1.5 × 10¹⁰ cm⁻³.</li>
<li><strong>n-type:</strong> donors (P, As, Sb); majority = electrons. <strong>p-type:</strong> acceptors (B, Ga); majority = holes.</li>
<li><strong>Mass-action law:</strong> n·p = ni² (in equilibrium).</li>
<li><strong>Conductivity:</strong> σ = q(nμn + pμp). Drift current ∝ electric field; diffusion current ∝ concentration gradient.</li>
<li><strong>Einstein relation:</strong> D/μ = kT/q = VT ≈ 26 mV at 300 K.</li>
<li><strong>Hall effect:</strong> Hall coefficient RH = 1/(q·n) for n-type. Used to find carrier type, concentration and mobility.</li>
<li>Mobility decreases with temperature (lattice scattering); intrinsic carriers increase with temperature, so resistance of a semiconductor decreases.</li>
</ul>

<h3>2. PN Junction</h3>
<pre>Built-in potential : V0 = VT · ln( NA·ND / ni² )
Depletion width    : W ∝ √(V0 − V)  (shrinks in forward bias, grows in reverse bias)
Diode equation     : I = Is · ( e^(V/(η·VT)) − 1 )
Temperature        : Vd falls by ~2 mV/°C ; Is roughly doubles every 10 °C</pre>
<ul>
<li><strong>Depletion (junction) capacitance:</strong> dominates in reverse bias, Cj = Cj0 / (1 + VR/V0)^m. Used in varactors.</li>
<li><strong>Diffusion capacitance:</strong> dominates in forward bias; proportional to forward current.</li>
<li><strong>Zener breakdown:</strong> heavily doped, thin depletion, VZ below ~5 V, negative temperature coefficient. <strong>Avalanche breakdown:</strong> lightly doped, VZ above ~7 V, positive temperature coefficient.</li>
</ul>

<h3>3. Special Diodes</h3>
<ul>
<li><strong>Schottky:</strong> metal–semiconductor junction, majority-carrier device, no minority storage, low Vf (~0.3 V), very fast switching.</li>
<li><strong>LED:</strong> direct-bandgap (GaAs, GaN); emits light on recombination. <strong>Photodiode:</strong> reverse biased, current ∝ light. <strong>Solar cell:</strong> photovoltaic, no bias.</li>
<li><strong>Tunnel diode:</strong> heavily doped, negative-resistance region; used in high-frequency oscillators. <strong>PIN diode:</strong> RF switch/attenuator.</li>
<li><strong>Varactor:</strong> voltage-variable capacitance, used in VCOs and tuning circuits.</li>
</ul>

<h3>4. Rectifiers (Vm = peak input voltage)</h3>
<pre>                  Half-wave    Full-wave (CT / Bridge)
Vdc               Vm/π         2Vm/π
Vrms              Vm/2         Vm/√2
Ripple factor     1.21         0.482
Efficiency (max)  40.6%        81.2%
PIV of diode      Vm           2Vm (centre-tap) , Vm (bridge)
Ripple frequency  f            2f
Bridge uses 4 diodes and no centre-tapped transformer; drop = 2 diode voltages.</pre>
<ul>
<li><strong>Capacitor filter:</strong> peak-to-peak ripple ≈ Idc / (f_ripple · C). Larger C or higher load resistance reduces ripple.</li>
<li><strong>Clippers</strong> cut part of the waveform; <strong>clampers</strong> shift the DC level (capacitor + diode); voltage multipliers (doubler, tripler) build high DC from AC.</li>
</ul>

<h3>5. Zener Voltage Regulator</h3>
<p>Series resistor Rs limits current: Rs = (Vin − VZ) / (IZ + IL). Regulation holds as long as IZ stays between IZmin and IZmax. Line regulation depends on Zener dynamic resistance rz.</p>

<h3>6. Interview Points</h3>
<ul>
<li>Why is Si preferred over Ge? Lower leakage, higher operating temperature, stable oxide (SiO₂).</li>
<li>Why is a diode forward voltage temperature dependent? Because Is increases exponentially with temperature.</li>
<li>Which breakdown is used in Zener regulators above 6 V? Mostly avalanche (a 5–6 V Zener has near-zero temperature coefficient).</li>
</ul>`
},
{
  title: 'BJT, MOSFET Amplifiers, Feedback & Oscillators',
  category: 'ECE', order: 3,
  description: 'Biasing, small-signal models, amplifier configurations, differential pair, power amplifiers, feedback, oscillators',
  tags: ['BJT','MOSFET','Amplifier','Feedback','Oscillator','Analog Electronics'],
  content: `<h2>Transistor Amplifiers — Analog Electronics Core</h2>
<h3>1. BJT Basics</h3>
<ul>
<li>Active region: base–emitter forward, base–collector reverse. IC = β·IB, IE = (β+1)·IB, α = β/(β+1).</li>
<li><strong>Early effect:</strong> base width shrinks with VCE, so IC rises slightly; output resistance ro = VA / IC.</li>
<li><strong>Biasing:</strong> fixed bias (poor stability), collector-to-base, and voltage-divider bias (best stability, S ≈ 1 + RB/RE).</li>
<li>Thermal runaway: higher IC heats the junction, which raises IC further; RE adds negative feedback to stop it.</li>
</ul>

<h3>2. Small-Signal Model (hybrid-π)</h3>
<pre>gm = IC / VT        rπ = β / gm        ro = VA / IC

Common Emitter  : Av = −gm (RC ‖ RL)     Ri ≈ rπ   Ro ≈ RC     (phase inversion, high gain)
CE with RE (unbypassed): Av ≈ −RC / RE     (more stable, less gain)
Common Collector: Av ≈ 1  (emitter follower)  Ri high, Ro low   (buffer)
Common Base     : Av = gm·RC, current gain ≈ 1, Ri low, Ro high (good high-frequency response)</pre>
<ul>
<li><strong>Cascode</strong> (CE + CB): high gain, high output resistance, small Miller effect, wide bandwidth.</li>
<li><strong>Darlington pair:</strong> β ≈ β1·β2, very high input resistance.</li>
</ul>

<h3>3. MOSFET</h3>
<pre>Triode     (VDS &lt; VGS − Vt): ID = k'n (W/L) [ (VGS − Vt)·VDS − VDS²/2 ]
Saturation (VDS ≥ VGS − Vt): ID = ½ k'n (W/L) (VGS − Vt)² (1 + λ·VDS)
gm = 2·ID / Vov = k'n (W/L)·Vov        ro = 1 / (λ·ID)

CS amplifier : Av = −gm (ro ‖ RD ‖ RL)
Source follower: Av = gm·RS / (1 + gm·RS) &lt; 1
JFET: ID = IDSS (1 − VGS/Vp)²</pre>
<p>MOSFET has very high input resistance (insulated gate), so it is the basis of VLSI. BJT gives higher gm for the same current.</p>

<h3>4. Differential Amplifier</h3>
<ul>
<li>Differential gain (differential output) Ad = gm·RC; single-ended output Ad = gm·RC/2.</li>
<li>Common-mode gain Acm ≈ −RC/(2·REE); CMRR = |Ad/Acm| ≈ gm·REE. A current source in the tail gives very high CMRR.</li>
</ul>

<h3>5. Frequency Response</h3>
<ul>
<li>Coupling and bypass capacitors set the low cutoff fL; internal capacitances (Cπ, Cμ or Cgs, Cgd) set the high cutoff fH.</li>
<li><strong>Miller effect:</strong> input capacitance is multiplied: Cin = Cgd·(1 + |Av|); it limits the bandwidth of CE/CS stages.</li>
<li>Gain–bandwidth trade-off. Transition frequency fT = gm / (2π(Cπ + Cμ)).</li>
</ul>

<h3>6. Power Amplifier Classes</h3>
<pre>Class A  : conducts 360°, max efficiency 25% (resistive) / 50% (transformer coupled)
Class B  : conducts 180°, max efficiency 78.5%, suffers crossover distortion
Class AB : slight overlap biasing, removes crossover distortion, ~50-70%
Class C  : conducts less than 180°, tuned RF amplifier, very high efficiency, high distortion</pre>

<h3>7. Negative Feedback</h3>
<pre>Closed loop gain  Af = A / (1 + A·β)
Benefits: gain desensitivity, wider bandwidth (×(1+Aβ)), lower distortion and noise.
Series mixing   → input resistance increases   | Shunt mixing   → input resistance decreases
Voltage sampling → output resistance decreases | Current sampling → output resistance increases</pre>

<h3>8. Oscillators (Barkhausen: |Aβ| = 1 and total phase = 0° or 360°)</h3>
<pre>RC phase-shift : f = 1 / (2π·R·C·√6) , requires gain ≥ 29
Wien bridge    : f = 1 / (2π·R·C) , requires gain = 3
Colpitts (C tap) / Hartley (L tap) : f = 1 / (2π·√(L·Ceq))
Crystal        : very stable frequency (series and parallel resonance)</pre>`
},
{
  title: 'Op-Amps, 555 Timer, Filters & Data Converters',
  category: 'ECE', order: 4,
  description: 'Ideal/real op-amp, all standard circuits, active filters, comparators, 555, ADC/DAC, regulators',
  tags: ['Op-Amp','Integrator','Filter','555 Timer','ADC','DAC','Linear Integrated Circuits'],
  content: `<h2>Operational Amplifiers & Linear ICs</h2>
<h3>1. Ideal Op-Amp</h3>
<p>Infinite gain, infinite input resistance, zero output resistance, infinite bandwidth, infinite CMRR, zero offset. With negative feedback the <strong>virtual short</strong> holds: V+ = V−, and no current flows into the inputs.</p>

<h3>2. Standard Circuits</h3>
<pre>Inverting amplifier      : Vo = −(Rf/R1)·Vin
Non-inverting amplifier  : Vo = (1 + Rf/R1)·Vin
Voltage follower         : Vo = Vin (gain 1, buffer)
Summing (inverting)      : Vo = −Rf (V1/R1 + V2/R2 + ...)
Difference amplifier     : Vo = (R2/R1)(V2 − V1)  (when resistors match)
Integrator               : Vo = −(1/RC) ∫ Vin dt
Differentiator           : Vo = −RC · dVin/dt
Instrumentation amp      : Vo = (1 + 2R/Rg)(V2 − V1)  (high CMRR, high Rin)
Log amplifier            : Vo = −VT · ln(Vin/(R·Is))   (diode in feedback)</pre>
<ul>
<li>Practical integrator has a resistor across C to stop DC drift (offset saturation). Practical differentiator has a series resistor to reduce noise.</li>
<li><strong>Comparator:</strong> open loop; output at ±Vsat. <strong>Schmitt trigger:</strong> positive feedback gives hysteresis and noise immunity; UTP and LTP set by the resistor ratio.</li>
<li><strong>Precision rectifier</strong> (super-diode) removes the diode drop in the rectified output.</li>
</ul>

<h3>3. Real Op-Amp Parameters</h3>
<ul>
<li><strong>Slew rate:</strong> max dVo/dt (V/µs). Full-power bandwidth fmax = SR / (2π·Vpeak).</li>
<li><strong>Gain–bandwidth product:</strong> constant for voltage-feedback op-amps; closed-loop BW = GBW / (closed-loop gain).</li>
<li>Input offset voltage, input bias current, input offset current, CMRR, PSRR. 741: GBW = 1 MHz, SR = 0.5 V/µs.</li>
</ul>

<h3>4. Active Filters</h3>
<ul>
<li>First-order low-pass: fc = 1/(2πRC), passband gain 1 + Rf/R1; roll-off 20 dB/decade. Second-order: 40 dB/decade (Sallen-Key).</li>
<li>Butterworth: maximally flat passband. Chebyshev: ripple in the passband, sharper cutoff. Bessel: linear phase.</li>
<li>Band-pass/band-stop: Q = f0 / BW. Notch filter removes 50 Hz mains hum.</li>
</ul>

<h3>5. 555 Timer</h3>
<pre>Astable   : f = 1.44 / ((RA + 2RB)·C)   duty cycle = (RA + RB) / (RA + 2RB)
Monostable: pulse width T = 1.1 · R · C
Thresholds: trigger at VCC/3, threshold at 2VCC/3</pre>

<h3>6. Data Converters</h3>
<ul>
<li>n-bit converter: LSB (step) = Vref / 2ⁿ; number of levels = 2ⁿ; quantization error = ±LSB/2.</li>
<li><strong>DAC:</strong> binary-weighted (needs wide resistor range) vs <strong>R-2R ladder</strong> (only two resistor values, preferred).</li>
<li><strong>ADC types:</strong> Flash (fastest, 2ⁿ − 1 comparators), SAR (n clock cycles, medium speed and resolution), Dual-slope (slow, very accurate, noise immune), Sigma-delta (high resolution, audio).</li>
</ul>

<h3>7. Voltage Regulators</h3>
<ul>
<li>78xx positive fixed, 79xx negative fixed (7805 gives 5 V). Needs input at least ~2 V above output (dropout). LDO has lower dropout.</li>
<li>LM317 adjustable: Vout = 1.25 · (1 + R2/R1). Switch-mode (buck/boost) regulators give higher efficiency than linear ones.</li>
</ul>`
},
{
  title: 'Digital Electronics I — Boolean Algebra & Combinational Circuits',
  category: 'ECE', order: 5,
  description: 'Number systems, K-map, adders, mux/decoder, hazards, logic families, memories and PLDs',
  tags: ['Digital Electronics','Boolean','K-Map','Adder','Multiplexer','Logic Families'],
  content: `<h2>Digital Electronics — Combinational Logic</h2>
<h3>1. Number Systems & Codes</h3>
<ul>
<li>n-bit unsigned range: 0 to 2ⁿ − 1. n-bit 2's complement: −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1 (one zero, easy addition). 1's complement has two zeros.</li>
<li>2's complement = invert all bits + 1. Overflow in addition happens when both operands have the same sign but the result has the opposite sign.</li>
<li>Gray code: only one bit changes between successive values (used in encoders, async FIFO pointers). BCD: 4 bits per decimal digit. Excess-3: BCD + 3 (self-complementing).</li>
</ul>

<h3>2. Boolean Algebra</h3>
<pre>De Morgan : (A·B)' = A' + B'      (A + B)' = A'·B'
Absorption: A + A·B = A           A·(A + B) = A
Consensus : A·B + A'·C + B·C = A·B + A'·C
Duality   : swap AND/OR and 0/1 in an identity
XOR       : A ⊕ B = A'B + AB'     A ⊕ A = 0     A ⊕ 1 = A'
NAND and NOR are universal gates (any function can be built from only one of them)</pre>
<ul>
<li><strong>K-map:</strong> group 1s in powers of 2 (1, 2, 4, 8) to get minimal SOP; group 0s for minimal POS. Don't-cares can be used as 0 or 1 to enlarge groups. Quine-McCluskey is the tabular method for more than 4 variables.</li>
<li>Minterm: product term with all variables (SOP). Maxterm: sum term with all variables (POS). Number of functions of n variables = 2^(2ⁿ).</li>
</ul>

<h3>3. Arithmetic Circuits</h3>
<pre>Half adder : Sum = A ⊕ B            Carry = A·B
Full adder : Sum = A ⊕ B ⊕ Cin      Cout = A·B + Cin·(A ⊕ B)
Half subtractor: Diff = A ⊕ B       Borrow = A'·B

Ripple-carry adder : delay grows linearly with n (carry must travel through each stage)
Carry look-ahead   : Generate G = A·B, Propagate P = A ⊕ B
                     C(i+1) = G(i) + P(i)·C(i)   → all carries computed in parallel, faster, more hardware</pre>
<ul>
<li>Subtractor using adder: A − B = A + (2's complement of B). A full adder can be made from two half adders and an OR gate.</li>
<li>Magnitude comparator, parity generator/checker (XOR tree), BCD adder (add 6 when result above 9).</li>
</ul>

<h3>4. MSI Blocks</h3>
<ul>
<li><strong>Multiplexer (2ⁿ:1):</strong> n select lines. Any n-variable function can be built with a 2ⁿ:1 mux, or with a 2ⁿ⁻¹:1 mux using one variable as data input. Mux is a universal logic block.</li>
<li><strong>Decoder (n to 2ⁿ):</strong> each output is a minterm; with OR gates it implements any SOP. <strong>Encoder:</strong> reverse of decoder; priority encoder handles multiple active inputs. <strong>Demux:</strong> decoder with enable used as data input.</li>
<li>4-to-1 mux needs 2 select lines. A 16:1 mux can be made from five 4:1 muxes.</li>
</ul>

<h3>5. Hazards</h3>
<ul>
<li>Static-1 hazard: output should stay 1 but glitches to 0 (in SOP when a variable change moves between two adjacent, uncovered groups). Static-0 hazard happens in POS. Dynamic hazard: multiple glitches during a transition.</li>
<li>Remove static hazards by adding the redundant (consensus) term covering the adjacent groups in the K-map.</li>
</ul>

<h3>6. Logic Families</h3>
<pre>Noise margin : NMH = VOH − VIH      NML = VIL − VOL
Fan-out      : number of gate inputs a gate can drive
CMOS : near-zero static power, high noise margin, large fan-out, power ∝ frequency
TTL  : faster in old days, higher static power, totem-pole output
ECL  : fastest (non-saturating) but high power, low noise margin
Open-collector / open-drain : wired-AND, needs a pull-up resistor, used for buses and level shifting
Tri-state : outputs 0, 1 or high-impedance (Hi-Z), used on shared buses</pre>

<h3>7. Memories & Programmable Logic</h3>
<ul>
<li>ROM (mask), PROM (one-time), EPROM (UV erase), EEPROM (electrical erase), Flash (block erase; NOR for code, NAND for storage).</li>
<li>A memory with n address lines and m data lines stores 2ⁿ × m bits. A ROM is a programmable OR array and can implement any combinational function.</li>
<li>PLA (programmable AND + OR), PAL (programmable AND, fixed OR), CPLD, FPGA (LUT-based; a k-input LUT implements any k-variable function).</li>
</ul>`
},
{
  title: 'Digital Electronics II — Sequential Circuits, FSMs & Timing',
  category: 'ECE', order: 6,
  description: 'Latches, flip-flops, counters, shift registers, Mealy/Moore FSM, setup/hold, metastability',
  tags: ['Flip-Flop','Counter','FSM','Mealy','Moore','Setup Hold','Sequential Circuits'],
  content: `<h2>Sequential Circuits</h2>
<h3>1. Latch vs Flip-Flop</h3>
<p>A <strong>latch</strong> is level sensitive (transparent while enable is active). A <strong>flip-flop</strong> is edge triggered (samples only at the clock edge). A flip-flop is usually two latches (master–slave).</p>

<h3>2. Flip-Flop Characteristic Equations</h3>
<pre>SR : Q+ = S + R'·Q        (S = R = 1 is forbidden)
JK : Q+ = J·Q' + K'·Q     (J = K = 1 toggles; race-around problem in level-triggered JK, solved by master–slave or edge triggering)
D  : Q+ = D
T  : Q+ = T ⊕ Q           (T = 1 toggles; JK with J = K = T)
Conversion: D from JK → J = D, K = D'</pre>
<ul>
<li>Asynchronous preset/clear override the clock. A D flip-flop with Q' fed back to D divides the clock by 2.</li>
</ul>

<h3>3. Counters & Registers</h3>
<ul>
<li><strong>Asynchronous (ripple) counter:</strong> output of one flip-flop clocks the next; simple, but delay accumulates and glitches appear in decoding. <strong>Synchronous counter:</strong> common clock; faster and glitch-free.</li>
<li>Number of flip-flops for a mod-N counter = ⌈log₂ N⌉. A mod-N counter resets itself at N using the clear input and a NAND detect.</li>
<li><strong>Ring counter:</strong> n flip-flops give n states. <strong>Johnson (twisted-ring) counter:</strong> n flip-flops give 2n states, only one bit changes per step.</li>
<li><strong>Shift registers:</strong> SISO, SIPO, PISO, PIPO (serial/parallel conversion). An LFSR (shift register with XOR feedback) generates pseudo-random sequences and is used in BIST and CRC.</li>
</ul>

<h3>4. Finite State Machines</h3>
<ul>
<li><strong>Moore:</strong> output depends only on the present state (more states, glitch-free outputs). <strong>Mealy:</strong> output depends on the present state and input (fewer states, responds faster, outputs can glitch).</li>
<li>Design steps: state diagram → state table → state assignment (binary, Gray, one-hot) → next-state and output equations → implementation. Minimise states by merging equivalent states.</li>
<li>One-hot encoding uses more flip-flops but less next-state logic; popular in FPGAs.</li>
<li>Sequence detector "101" (overlapping): Mealy form needs 3 states, Moore form needs 4 states (the extra state is the one that produces the output).</li>
</ul>

<h3>5. Timing</h3>
<pre>Setup time (tsu): data must be stable BEFORE the clock edge
Hold time  (th) : data must stay stable AFTER the clock edge
Clock-to-Q (tcq): delay from clock edge to output change

Max clock frequency : Tclk ≥ tcq + tlogic(max) + tsu
Hold condition      : tcq + tlogic(min) ≥ th      (independent of clock frequency)</pre>
<ul>
<li><strong>Metastability:</strong> if setup/hold is violated, the output may hover between 0 and 1 for an unbounded time. Use a 2-flip-flop synchronizer when crossing clock domains. Reduces failure probability (MTBF improves exponentially with resolution time).</li>
<li>A hold violation cannot be fixed by slowing the clock; it needs extra delay in the data path.</li>
</ul>

<h3>6. Memory Elements in Brief</h3>
<ul>
<li>SRAM: flip-flop style cell, fast, no refresh, large area. DRAM: one transistor + one capacitor, needs refresh, dense and cheap.</li>
<li>FIFO depth calculation, synchronous vs asynchronous (Gray-coded pointers across clock domains).</li>
</ul>`
},
{
  title: 'Signals & Systems — Complete Theory',
  category: 'ECE', order: 7,
  description: 'Signal classification, LTI systems, convolution, Fourier series/transform, Laplace, Z-transform, sampling',
  tags: ['Signals','LTI','Fourier','Laplace','Z-Transform','Sampling','Convolution'],
  content: `<h2>Signals & Systems</h2>
<h3>1. Classification of Signals</h3>
<ul>
<li>Continuous vs discrete time; deterministic vs random; even x(t) = x(−t), odd x(t) = −x(−t); periodic with period T.</li>
<li><strong>Energy signal:</strong> finite energy, zero average power (e.g., pulse, decaying exponential). <strong>Power signal:</strong> finite power, infinite energy (e.g., sinusoid, periodic signals).</li>
<li>Sum of two periodic signals is periodic only if the ratio of their periods is rational.</li>
</ul>

<h3>2. System Properties</h3>
<ul>
<li><strong>Linear</strong> (superposition), <strong>time-invariant</strong> (shift in input gives same shift in output), <strong>causal</strong> (output depends on present and past), <strong>memoryless</strong>, <strong>stable (BIBO)</strong>: bounded input gives bounded output.</li>
<li>LTI system is causal iff h(t) = 0 for t &lt; 0, and BIBO stable iff ∫|h(t)|dt is finite.</li>
</ul>

<h3>3. Convolution</h3>
<pre>y(t) = x(t) * h(t) = ∫ x(τ) h(t − τ) dτ        y[n] = Σ x[k] h[n − k]
Length of y[n] = Lx + Lh − 1
Properties: commutative, associative, distributive
Convolution in time  ⇔  multiplication in frequency</pre>

<h3>4. Fourier Series & Transform</h3>
<ul>
<li>Fourier series represents a periodic signal as a sum of harmonics. Dirichlet conditions ensure convergence. Even signals have only cosine terms; odd signals have only sine terms. Gibbs phenomenon: ~9% overshoot at discontinuities.</li>
<li>Parseval's theorem: energy in time domain equals energy in frequency domain.</li>
</ul>
<pre>Important pairs (Fourier transform):
δ(t)            ⇔ 1
1               ⇔ 2π·δ(ω)
e^(−at)·u(t)    ⇔ 1 / (a + jω)
rect(t/T)       ⇔ T·sinc(ωT/2π)       (rect in time = sinc in frequency)
cos(ω0 t)       ⇔ π[δ(ω − ω0) + δ(ω + ω0)]
Gaussian        ⇔ Gaussian
Time shift t0   ⇔ multiply by e^(−jωt0)    Scaling x(at) ⇔ (1/|a|) X(ω/a)
Differentiation ⇔ multiply by jω</pre>

<h3>5. Laplace Transform</h3>
<pre>X(s) = ∫ x(t) e^(−st) dt      (ROC is important)
u(t) ⇔ 1/s      e^(−at)u(t) ⇔ 1/(s + a)      t·u(t) ⇔ 1/s²
Initial value : x(0+) = lim s→∞ s·X(s)     Final value : x(∞) = lim s→0 s·X(s)
H(s) = Y(s)/X(s) = transfer function</pre>
<ul>
<li>A causal system is BIBO stable iff all poles lie in the left half of the s-plane (ROC includes the jω axis). Zeros shape the response; poles decide stability.</li>
</ul>

<h3>6. Sampling</h3>
<ul>
<li><strong>Nyquist:</strong> fs ≥ 2·fmax to recover the signal. Below this, <strong>aliasing</strong> occurs (use an anti-aliasing low-pass filter before sampling). Ideal reconstruction uses a sinc interpolation filter.</li>
<li>Sampling in time = periodic repetition of the spectrum at multiples of fs.</li>
</ul>

<h3>7. Z-Transform (Discrete Time)</h3>
<pre>X(z) = Σ x[n] z^(−n)
a^n·u[n] ⇔ z/(z − a)  , ROC |z| &gt; |a|        δ[n] ⇔ 1        u[n] ⇔ z/(z − 1)
Causal system: ROC is outside the outermost pole.
Stable system: ROC includes the unit circle (all poles inside |z| = 1 for causal).</pre>`
},
{
  title: 'Digital Signal Processing — DFT, FFT, FIR & IIR Filters',
  category: 'ECE', order: 8,
  description: 'DFT/FFT, circular convolution, FIR vs IIR design, windows, bilinear transform, multirate',
  tags: ['DSP','FFT','DFT','FIR','IIR','Filter Design','Multirate'],
  content: `<h2>Digital Signal Processing</h2>
<h3>1. DFT & FFT</h3>
<pre>X[k] = Σ(n=0..N−1) x[n]·e^(−j2πkn/N)         Twiddle factor W_N = e^(−j2π/N)
Direct DFT: N² complex multiplications
Radix-2 FFT: (N/2)·log₂N complex multiplications, log₂N stages, N/2 butterflies per stage
Frequency resolution Δf = fs / N
Zero padding gives a smoother spectrum (interpolation) but does not improve true resolution.</pre>
<ul>
<li>DIT-FFT takes bit-reversed input and gives natural-order output; DIF-FFT takes natural-order input and gives bit-reversed output.</li>
<li><strong>Circular convolution</strong> (N-point DFT product) equals linear convolution if N ≥ L + M − 1 (zero padded). Long signals use overlap-add or overlap-save.</li>
</ul>

<h3>2. FIR Filters</h3>
<ul>
<li>Finite impulse response, no feedback, <strong>always stable</strong>. Symmetric or anti-symmetric coefficients give <strong>exact linear phase</strong> (constant group delay) which preserves waveform shape.</li>
<li>Need higher order than IIR for the same sharpness.</li>
<li><strong>Window method:</strong> truncate the ideal impulse response with a window. Rectangular: narrowest main lobe but poor stopband (Gibbs). Hamming/Hanning/Blackman: wider main lobe but better side-lobe attenuation. Kaiser lets you tune the trade-off.</li>
<li>Other methods: frequency sampling, Parks–McClellan (equiripple).</li>
</ul>

<h3>3. IIR Filters</h3>
<ul>
<li>Feedback (poles and zeros), efficient (lower order), but can be unstable and has non-linear phase.</li>
<li>Design from analog prototypes (Butterworth, Chebyshev I/II, Elliptic):
<br><strong>Impulse invariance:</strong> maps h(t) samples; suffers aliasing, only suited to band-limited filters.
<br><strong>Bilinear transform:</strong> s = (2/T)·(z − 1)/(z + 1); no aliasing but frequency warping Ω = (2/T)·tan(ω/2), so critical frequencies are pre-warped.</li>
<li>Realisations: direct form I/II, cascade (second-order sections, best for sensitivity), parallel, lattice.</li>
</ul>

<h3>4. Multirate DSP</h3>
<ul>
<li><strong>Decimation by M:</strong> low-pass filter first (anti-aliasing), then keep every M-th sample. <strong>Interpolation by L:</strong> insert L − 1 zeros, then low-pass filter (anti-imaging).</li>
<li>Rational rate change L/M; polyphase structures reduce computation.</li>
</ul>

<h3>5. Finite Word-Length Effects</h3>
<ul>
<li>Coefficient quantization moves poles/zeros; IIR sensitivity grows with order. Round-off noise, overflow and limit cycles in fixed-point implementations.</li>
</ul>

<h3>6. DSP Processors & Applications</h3>
<ul>
<li>Features: Harvard architecture, single-cycle MAC (multiply–accumulate), circular buffers, bit-reversed addressing, zero-overhead loops.</li>
<li>Applications: audio/speech, radar, OFDM (FFT), image processing, adaptive filters (LMS) for echo cancellation.</li>
</ul>`
},
{
  title: 'Control Systems — Time, Frequency Domain & Stability',
  category: 'ECE', order: 9,
  description: 'Transfer functions, time response, steady-state error, Routh, root locus, Bode, Nyquist, state space, PID',
  tags: ['Control Systems','Routh','Root Locus','Bode','Nyquist','State Space','PID'],
  content: `<h2>Control Systems</h2>
<h3>1. Modelling</h3>
<ul>
<li>Transfer function = Laplace of output / Laplace of input with zero initial conditions. Closed loop: T(s) = G(s) / (1 + G(s)H(s)) for negative feedback.</li>
<li>Reduce block diagrams or use <strong>Mason's gain formula</strong> on signal flow graphs: T = Σ(Pk·Δk) / Δ.</li>
<li>Analogies: force–voltage and force–current for mechanical to electrical systems.</li>
</ul>

<h3>2. Time Response</h3>
<pre>Second order: G(s) = ωn² / (s² + 2ζωn·s + ωn²)
Peak overshoot Mp = exp( −π·ζ / √(1 − ζ²) ) × 100%
Peak time      tp = π / ωd          where ωd = ωn·√(1 − ζ²)
Settling time  ts ≈ 4 / (ζ·ωn)     (2% criterion), 3 / (ζ·ωn) for 5%
ζ = 0 undamped, 0 &lt; ζ &lt; 1 underdamped, ζ = 1 critical, ζ &gt; 1 overdamped</pre>

<h3>3. Steady-State Error</h3>
<pre>System type = number of poles of G(s)H(s) at the origin
Kp = lim(s→0) G·H      Kv = lim(s→0) s·G·H      Ka = lim(s→0) s²·G·H
ess (step)      = 1 / (1 + Kp)
ess (ramp)      = 1 / Kv
ess (parabolic) = 1 / Ka
Type 0: finite error for step | Type 1: zero for step, finite for ramp | Type 2: zero for ramp</pre>

<h3>4. Stability</h3>
<ul>
<li><strong>Routh–Hurwitz:</strong> number of sign changes in the first column of the Routh array = number of right-half-plane roots. A row of zeros indicates symmetric roots (use the auxiliary equation). Necessary condition: all coefficients present and of the same sign.</li>
<li><strong>Root locus:</strong> plots closed-loop poles as gain K varies 0 to ∞. Starts at open-loop poles, ends at zeros (or at infinity). Number of asymptotes = P − Z; angles = (2k+1)·180° / (P − Z); centroid = (Σpoles − Σzeros) / (P − Z).</li>
</ul>

<h3>5. Frequency Domain</h3>
<ul>
<li><strong>Bode plot:</strong> each pole adds −20 dB/decade slope, each zero +20 dB/decade. Gain margin (GM) and phase margin (PM) are measured at phase crossover and gain crossover respectively. Stable if both are positive. Larger PM means less overshoot (ζ ≈ PM/100 for small values).</li>
<li><strong>Nyquist criterion:</strong> Z = N + P, where Z = closed-loop poles in the right half plane, P = open-loop right-half-plane poles, N = clockwise encirclements of the −1 point. Stable if Z = 0.</li>
<li>Bandwidth is linked to rise time: higher bandwidth means faster response but more noise sensitivity.</li>
</ul>

<h3>6. State Space</h3>
<pre>x' = A·x + B·u        y = C·x + D·u
Transfer function: G(s) = C·(sI − A)^(−1)·B + D
Poles = eigenvalues of A
Controllable iff rank [B  AB  A²B ...] = n      Observable iff rank [C; CA; CA² ...] = n</pre>

<h3>7. Compensators & PID</h3>
<ul>
<li><strong>Lead compensator:</strong> adds phase lead, improves transient response and speed. <strong>Lag compensator:</strong> improves steady-state accuracy, reduces bandwidth.</li>
<li><strong>PID:</strong> P reduces rise time but leaves steady-state error; I removes steady-state error but can cause overshoot and instability; D adds damping and anticipates error but amplifies noise.</li>
</ul>`
},
{
  title: 'Electromagnetic Theory, Transmission Lines & Waveguides',
  category: 'ECE', order: 10,
  description: 'Maxwell equations, plane waves, reflection, transmission lines, Smith chart basics, rectangular waveguide',
  tags: ['Electromagnetics','Maxwell','Transmission Line','VSWR','Waveguide','Plane Wave'],
  content: `<h2>Electromagnetic Theory</h2>
<h3>1. Static Fields</h3>
<ul>
<li><strong>Coulomb's law:</strong> F = Q1Q2 / (4πε0R²). <strong>Gauss's law:</strong> ∮D·dS = Qenclosed. E = −∇V. Laplace equation ∇²V = 0 (no charge), Poisson ∇²V = −ρ/ε.</li>
<li><strong>Biot–Savart</strong> and <strong>Ampere's circuital law:</strong> ∮H·dl = Ienclosed. Force on a charge: F = q(E + v × B).</li>
<li>Capacitance of parallel plates C = εA/d; energy density in electric field ½εE², in magnetic field ½μH².</li>
</ul>

<h3>2. Maxwell's Equations (differential form)</h3>
<pre>∇·D = ρv                  (Gauss, electric)
∇·B = 0                   (no magnetic monopoles)
∇×E = −∂B/∂t              (Faraday)
∇×H = J + ∂D/∂t           (Ampere with Maxwell's displacement current)</pre>
<p>Boundary conditions: tangential E and tangential H (no surface current) are continuous; normal D and normal B are continuous (no surface charge). Inside a perfect conductor, E = 0.</p>

<h3>3. Plane Waves</h3>
<pre>Free space: c = 1/√(μ0·ε0) = 3×10⁸ m/s     η0 = √(μ0/ε0) ≈ 377 Ω
Propagation constant γ = α + jβ ;   β = 2π/λ ;   vp = ω/β
Dielectric: v = c/√(εr)      η = η0/√(εr)
Skin depth (good conductor): δ = 1/√(π·f·μ·σ)   (fields decay by 1/e in one δ)
Poynting vector S = E × H   (power flow, W/m²)</pre>
<ul>
<li>E, H and direction of propagation are mutually perpendicular (TEM wave). Polarization: linear, circular, elliptical.</li>
<li><strong>Normal incidence:</strong> reflection coefficient Γ = (η2 − η1)/(η2 + η1), transmission τ = 1 + Γ.</li>
<li><strong>Oblique incidence:</strong> Snell's law. Brewster angle: no reflection for parallel polarization. Total internal reflection occurs beyond the critical angle (basis of optical fibre).</li>
</ul>

<h3>4. Transmission Lines</h3>
<pre>Characteristic impedance Z0 = √((R + jωL)/(G + jωC))  →  lossless: Z0 = √(L/C)
Reflection coefficient   ΓL = (ZL − Z0)/(ZL + Z0)
VSWR = (1 + |Γ|)/(1 − |Γ|)      ranges from 1 (matched) to infinity (full reflection)
Input impedance: Zin = Z0·(ZL + j·Z0·tan βl)/(Z0 + j·ZL·tan βl)</pre>
<ul>
<li>Short-circuited line: Zin = j·Z0·tan βl. Open-circuited: Zin = −j·Z0·cot βl.</li>
<li><strong>λ/4 transformer:</strong> Zin = Z0²/ZL; to match ZL to Z0, insert a quarter-wave section of Z0' = √(Z0·ZL). A λ/2 line repeats the load impedance.</li>
<li>Distortionless line: R/L = G/C (Heaviside condition). Stub matching and the <strong>Smith chart</strong> (graphical tool for Γ, impedance and admittance; full circle = λ/2).</li>
</ul>

<h3>5. Rectangular Waveguide</h3>
<pre>Cutoff frequency fc = (c/2)·√( (m/a)² + (n/b)² )
Dominant mode: TE10, fc = c/(2a)     (a is the wider dimension)
Guide wavelength λg = λ / √(1 − (fc/f)²)     (always larger than λ)
vp·vg = c²   (phase velocity above c, group velocity below c)
Above cutoff the wave propagates; below cutoff it is evanescent.</pre>
<ul>
<li>Waveguides carry TE and TM modes (no TEM, since only one conductor). Used at microwave frequencies for low loss and high power; a coaxial cable supports TEM.</li>
</ul>`
},
{
  title: 'Antennas, Wave Propagation & Microwave Engineering',
  category: 'ECE', order: 11,
  description: 'Antenna parameters, dipoles, arrays, Friis, propagation modes, microwave components, radar',
  tags: ['Antenna','Propagation','Microwave','Radar','Friis','Waveguide Components'],
  content: `<h2>Antennas & Microwave Engineering</h2>
<h3>1. Antenna Parameters</h3>
<ul>
<li><strong>Radiation pattern:</strong> field/power vs angle. Isotropic radiator radiates equally in all directions (reference). Beamwidth (HPBW) is the angle between half-power points.</li>
<li><strong>Directivity D</strong> = maximum radiation intensity / average intensity. <strong>Gain G = η·D</strong> (η = radiation efficiency). Express in dBi relative to isotropic.</li>
<li><strong>Effective aperture:</strong> Ae = λ²·G / (4π). <strong>Radiation resistance:</strong> power radiated = I²·Rr.</li>
<li>Reciprocity: the pattern is the same in transmit and receive. Antenna is matched to the line (low VSWR) over its bandwidth.</li>
</ul>
<pre>Hertzian dipole       : D = 1.5
Half-wave dipole      : D = 1.64 (2.15 dBi), Rr ≈ 73 Ω
Quarter-wave monopole : D = 3.28 (5.15 dBi), Rr ≈ 36.5 Ω
Friis transmission equation : Pr = Pt·Gt·Gr·(λ / (4πR))²</pre>

<h3>2. Types</h3>
<ul>
<li><strong>Arrays:</strong> total pattern = element pattern × array factor. Broadside (phase difference 0), end-fire (phase difference −βd). Beam steering by changing phase (phased array, used in radar and 5G).</li>
<li><strong>Yagi–Uda:</strong> driven element + reflector + directors; TV reception. <strong>Parabolic dish:</strong> very high gain for satellite. <strong>Horn:</strong> feed for dishes, waveguide to free space. <strong>Microstrip (patch):</strong> low profile, used in mobiles; narrow bandwidth. <strong>Loop</strong> antennas for direction finding.</li>
</ul>

<h3>3. Wave Propagation</h3>
<ul>
<li><strong>Ground wave:</strong> below ~2 MHz (MF/LF), follows the earth's curvature. <strong>Sky wave:</strong> 2–30 MHz (HF), reflected by ionosphere layers D, E, F1, F2 (long distance communication). <strong>Space (line-of-sight) wave:</strong> above 30 MHz (VHF, UHF, microwaves).</li>
<li>Critical frequency fc is the highest frequency reflected at vertical incidence. Maximum usable frequency MUF = fc·sec θ. Skip distance is the shortest ground distance reached by the sky wave.</li>
<li>Radio horizon with 4/3 earth radius: d ≈ 4.12·(√h1 + √h2) km, with antenna heights in metres.</li>
<li>Fading, multipath, tropospheric scatter, ducting.</li>
</ul>

<h3>4. Microwave Components</h3>
<ul>
<li><strong>Directional coupler</strong> samples power in one direction. <strong>Circulator:</strong> 3-port ferrite device, power flows 1→2→3→1. <strong>Isolator:</strong> allows one-way transmission. <strong>Magic tee:</strong> sum and difference ports. Attenuators, phase shifters, resonant cavities.</li>
<li><strong>S-parameters:</strong> S11 = input reflection, S21 = forward transmission, S12 = reverse, S22 = output reflection. For reciprocal networks S12 = S21; lossless networks are unitary.</li>
<li><strong>Sources:</strong> Klystron (velocity modulation, amplifier/oscillator), magnetron (high-power pulsed radar), TWT (broadband amplifier), Gunn diode (transferred electron effect, oscillator), IMPATT (avalanche transit time, high power).</li>
</ul>

<h3>5. Radar</h3>
<pre>Range R = c·t / 2          (t = round-trip time)
Maximum unambiguous range Run = c / (2·PRF)
Radar equation (monostatic): Rmax⁴ = Pt·G²·λ²·σ / ((4π)³·Smin)
Doppler shift fd = 2·v·f / c   (used by CW and MTI radars to measure speed)</pre>`
},
{
  title: 'Analog Communication — AM, FM, Noise & Receivers',
  category: 'ECE', order: 12,
  description: 'AM/DSB/SSB/VSB, FM and PM, Carson rule, superheterodyne receiver, noise figure, pulse modulation',
  tags: ['Analog Communication','AM','FM','SSB','Superheterodyne','Noise','PLL'],
  content: `<h2>Analog Communication</h2>
<h3>1. Amplitude Modulation (AM)</h3>
<pre>s(t) = Ac·[1 + μ·cos(ωm·t)]·cos(ωc·t)       modulation index μ = Am/Ac  (μ ≤ 1 to avoid over-modulation)
Bandwidth = 2·fm
Total power  Pt = Pc·(1 + μ²/2)           Sideband power fraction (efficiency) η = μ²/(2 + μ²)
Max efficiency at μ = 1 is only 33.3%</pre>
<ul>
<li><strong>DSB-SC:</strong> carrier suppressed, BW 2fm, all power in sidebands (efficiency 100%), needs coherent detection. <strong>SSB:</strong> one sideband, BW = fm, saves power and bandwidth, complex to generate (filter or phase-shift method). <strong>VSB:</strong> a vestige of the other sideband; used for TV video.</li>
<li>Generation: square-law modulator, switching modulator, balanced modulator (DSB-SC).</li>
<li><strong>Detection:</strong> envelope detector (diode + RC with 1/fc ≪ RC ≪ 1/fm) for AM; coherent (synchronous) detector for DSB-SC/SSB. Too large RC causes diagonal clipping; phase/frequency error in the local oscillator distorts the output.</li>
</ul>

<h3>2. Angle Modulation (FM / PM)</h3>
<pre>FM: s(t) = Ac·cos( ωc·t + β·sin(ωm·t) )     β = Δf / fm  (modulation index)
Carson's rule: BW ≈ 2·(Δf + fm) = 2·fm·(β + 1)
Narrowband FM (β ≪ 1): BW ≈ 2fm    Wideband FM (β &gt; 1)
Commercial FM broadcast: Δf = 75 kHz, audio up to 15 kHz, 200 kHz channel spacing</pre>
<ul>
<li>FM has constant amplitude, so it is immune to amplitude noise and a non-linear (class C) amplifier can be used. Trade-off: needs more bandwidth than AM; shows a threshold effect at low SNR and the capture effect (stronger signal wins).</li>
<li>In FM, Δf is proportional to the message amplitude; in PM, the phase deviation is proportional to message amplitude.</li>
<li><strong>Generation:</strong> direct (VCO using a varactor) and indirect (Armstrong, phase modulator + frequency multiplier). <strong>Demodulation:</strong> slope detector, Foster–Seeley discriminator, ratio detector, PLL demodulator.</li>
<li><strong>Pre-emphasis / de-emphasis:</strong> boosts high audio frequencies before transmission and restores them after, improving SNR since FM noise rises with frequency.</li>
</ul>

<h3>3. Superheterodyne Receiver</h3>
<pre>Mixer converts RF to a fixed intermediate frequency: fIF = fLO − fRF
Typical IF: 455 kHz (AM), 10.7 MHz (FM)
Image frequency = fsi = fs + 2·fIF      (rejected by the RF tuned stage)
Image rejection improves with higher Q of the RF stage and a higher IF.</pre>
<ul>
<li>Key receiver specs: <strong>sensitivity</strong> (weakest signal), <strong>selectivity</strong> (reject adjacent channels), <strong>fidelity</strong>. AGC keeps output level constant.</li>
</ul>

<h3>4. Noise</h3>
<pre>Thermal noise power = k·T·B     Vn² = 4·k·T·R·B      (k = 1.38×10⁻²³ J/K)
Noise figure F = SNRin / SNRout   (NF in dB = 10·log10 F)
Friis formula for cascaded stages: F = F1 + (F2 − 1)/G1 + (F3 − 1)/(G1·G2) + ...
Effective noise temperature Te = T0·(F − 1),  T0 = 290 K</pre>
<ul>
<li>The first stage (LNA) dominates the noise figure of a receiver, so it needs low noise and high gain.</li>
<li>Noise types: thermal (Johnson), shot, flicker (1/f), partition noise.</li>
</ul>

<h3>5. Pulse Modulation & Multiplexing</h3>
<ul>
<li>PAM (amplitude), PWM (width), PPM (position). TDM interleaves samples in time; FDM places channels at different carrier frequencies.</li>
<li>Sampling theorem requires fs ≥ 2·fm. Natural vs flat-top sampling; aperture effect.</li>
</ul>`
},
{
  title: 'Digital Communication — PCM, Modulation, ISI & Spread Spectrum',
  category: 'ECE', order: 13,
  description: 'PCM, line codes, Nyquist ISI criterion, ASK/FSK/PSK/QAM, BER, OFDM, CDMA, Shannon capacity',
  tags: ['Digital Communication','PCM','BPSK','QPSK','QAM','BER','OFDM','CDMA'],
  content: `<h2>Digital Communication</h2>
<h3>1. Pulse Code Modulation (PCM)</h3>
<pre>Steps: sampling (fs ≥ 2·fm) → quantization (L = 2ⁿ levels) → encoding (n bits per sample)
Bit rate = n · fs          Bandwidth ≥ bit rate / 2 (ideal), ≈ n·fm
Quantization step Δ = (2·Vmax)/L      Error power = Δ²/12
SQNR ≈ 6.02·n + 1.76 dB   (full-scale sinusoid)    → each extra bit gives +6 dB
Companding (µ-law 255 in US/Japan, A-law 87.6 in Europe/India) improves SQNR for weak signals</pre>
<ul>
<li><strong>Delta modulation:</strong> 1 bit per sample; slope overload (step too small) and granular noise (step too large). Adaptive DM reduces both.</li>
<li><strong>Line codes:</strong> unipolar NRZ, polar NRZ, RZ, AMI (bipolar), Manchester (self-clocking, no DC component, needs twice the bandwidth). Clock recovery needs enough transitions.</li>
</ul>

<h3>2. ISI & Pulse Shaping</h3>
<ul>
<li>Limited bandwidth makes pulses overlap: <strong>Inter-symbol interference (ISI)</strong>. <strong>Nyquist criterion</strong> for zero ISI: minimum bandwidth = Rs/2 (Rs = symbol rate), achieved only by an ideal sinc pulse.</li>
<li><strong>Raised-cosine filter</strong> (roll-off α, 0 to 1): BW = (1 + α)·Rs / 2, practical and zero ISI at sampling instants.</li>
<li><strong>Eye diagram:</strong> wide eye opening means low ISI and noise margin. <strong>Matched filter</strong> maximizes SNR at the sampling instant: peak SNR = 2E/N0. Equalizers (zero-forcing, MMSE) counter channel ISI.</li>
</ul>

<h3>3. Digital Modulation & BER</h3>
<pre>Coherent BPSK  : Pe = Q( √(2·Eb/N0) )       1 bit/symbol, best BER among binary schemes
QPSK           : same BER per bit as BPSK, 2 bits/symbol, half the bandwidth
Coherent BFSK  : Pe = Q( √(Eb/N0) )          (3 dB worse than BPSK)
Non-coherent BFSK: Pe = ½·exp(−Eb/(2·N0))
DPSK           : Pe = ½·exp(−Eb/N0)           (no carrier recovery needed)
M-ary PSK/QAM  : bits per symbol = log₂M  → more spectral efficiency, but needs higher SNR
16-QAM: 4 bits/symbol    64-QAM: 6 bits/symbol</pre>
<ul>
<li>ASK is simple but noise sensitive. FSK is constant envelope (used in low-cost radios). PSK has the best noise performance. MSK/GMSK: continuous phase, narrow spectrum (GSM uses GMSK).</li>
<li>Q(x) = tail probability of the standard Gaussian; decreases rapidly with x. Gray coding of constellation points makes neighboring-symbol errors flip only one bit.</li>
</ul>

<h3>4. Channel Capacity</h3>
<pre>Shannon–Hartley: C = B · log₂(1 + S/N)   bits/s
Reliable communication is possible for R &lt; C and impossible for R &gt; C.
Ultimate Shannon limit: Eb/N0 ≥ ln 2 = −1.59 dB (as bandwidth → infinity)</pre>

<h3>5. Spread Spectrum, OFDM & Multiple Access</h3>
<ul>
<li><strong>DSSS:</strong> data multiplied by a high-rate PN code; processing gain = chip rate / bit rate; resists jamming and multipath, enables CDMA. <strong>FHSS:</strong> carrier hops over many frequencies (Bluetooth).</li>
<li><strong>OFDM:</strong> splits a wideband channel into many orthogonal narrowband subcarriers generated by an IFFT. Each subcarrier sees flat fading; a cyclic prefix longer than the delay spread removes ISI. Used in Wi-Fi, LTE and 5G. Drawbacks: high PAPR and sensitivity to frequency offset.</li>
<li>Multiple access: FDMA, TDMA, CDMA, OFDMA. <strong>MIMO</strong> uses multiple antennas for diversity or spatial multiplexing to raise capacity.</li>
</ul>`
},
{
  title: 'Information Theory & Error Control Coding',
  category: 'ECE', order: 14,
  description: 'Entropy, Huffman coding, channel capacity, linear block codes, Hamming, cyclic codes, CRC, convolutional codes',
  tags: ['Information Theory','Entropy','Huffman','Hamming Code','CRC','Convolutional Codes'],
  content: `<h2>Information Theory & Coding</h2>
<h3>1. Entropy & Source Coding</h3>
<pre>Information of a symbol : I = log₂(1/p) bits
Entropy H = − Σ p·log₂(p)   bits/symbol (average information)
Max entropy for M symbols: H = log₂M when all are equally likely
Joint / conditional entropy: H(X,Y) = H(X) + H(Y|X)       Mutual information I(X;Y) = H(X) − H(X|Y)
Source coding efficiency = H / average code length L̄</pre>
<ul>
<li><strong>Huffman coding:</strong> optimal prefix code. Repeatedly merge the two least probable symbols; more probable symbols get shorter codes. Shannon–Fano is similar but not always optimal. Lempel–Ziv is a dictionary-based universal code (used in ZIP/GIF).</li>
<li>Prefix (instantaneous) codes are uniquely decodable and satisfy the <strong>Kraft inequality</strong> Σ 2^(−li) ≤ 1.</li>
</ul>

<h3>2. Channel Capacity</h3>
<ul>
<li>Binary symmetric channel with error probability p: C = 1 − H(p), where H(p) = −p·log₂p − (1−p)·log₂(1−p). Binary erasure channel: C = 1 − ε.</li>
<li>Channel coding theorem: with a code of rate R &lt; C, error probability can be made arbitrarily small.</li>
</ul>

<h3>3. Linear Block Codes (n, k)</h3>
<pre>n = codeword length, k = message bits, rate = k/n, parity bits = n − k
Codeword c = m·G     Parity check: c·Hᵀ = 0     Syndrome s = r·Hᵀ (r = received word)
Minimum distance dmin = minimum Hamming weight of a non-zero codeword
Detects up to (dmin − 1) errors, corrects up to ⌊(dmin − 1)/2⌋ errors
Hamming bound for single-error correction: 2^(n−k) ≥ n + 1</pre>
<ul>
<li><strong>Hamming (7,4):</strong> 3 parity bits, dmin = 3, corrects any single-bit error; the syndrome value gives the error position. Extended Hamming (8,4) with an extra parity bit has dmin = 4 (single-error correct, double-error detect).</li>
<li>Simple parity check detects an odd number of errors (dmin = 2).</li>
</ul>

<h3>4. Cyclic Codes & CRC</h3>
<ul>
<li>Cyclic codes are described by a generator polynomial g(x) that divides xⁿ + 1. Encoding and syndrome computation use shift registers (LFSR).</li>
<li><strong>CRC:</strong> append the remainder of message·xʳ divided by g(x); the receiver divides again and expects zero remainder. Detects all burst errors shorter than r + 1 bits. Used in Ethernet, USB, storage.</li>
</ul>

<h3>5. Convolutional & Modern Codes</h3>
<ul>
<li>Convolutional code (n, k, K): output depends on the current input and the K − 1 previous inputs (memory). Rate = k/n. Decoded optimally by the <strong>Viterbi algorithm</strong> (maximum-likelihood sequence estimation on a trellis).</li>
<li><strong>Turbo codes and LDPC codes</strong> approach the Shannon limit and are used in 4G/5G, Wi-Fi and deep-space links. ARQ (retransmission) vs FEC (forward error correction); hybrid ARQ combines them.</li>
</ul>`
},
{
  title: 'Microprocessors — 8085 & 8086 Architecture and Programming',
  category: 'ECE', order: 15,
  description: '8085/8086 architecture, registers, flags, addressing modes, interrupts, memory segmentation, example programs',
  tags: ['8085','8086','Microprocessor','Assembly','Interrupts','Segmentation'],
  content: `<h2>Microprocessors — 8085 & 8086</h2>
<h3>1. 8085 (8-bit)</h3>
<ul>
<li>8-bit data bus, 16-bit address bus (64 KB memory), 3 MHz typical. Lower address/data lines AD0–AD7 are <strong>multiplexed</strong>; the ALE signal latches the low address byte (needs an external latch like 74LS373).</li>
<li><strong>Registers:</strong> accumulator A, general purpose B, C, D, E, H, L (can pair as BC, DE, HL; HL is the memory pointer M), stack pointer SP, program counter PC.</li>
<li><strong>Flags (5):</strong> Sign, Zero, Auxiliary Carry, Parity, Carry.</li>
<li><strong>Addressing modes:</strong> immediate (MVI A, 05H), register (MOV A, B), direct (LDA 2050H), register indirect (MOV A, M), implied (CMA).</li>
</ul>
<pre>Interrupts (priority high to low):
TRAP (non-maskable, edge + level sensitive) > RST 7.5 (edge) > RST 6.5 > RST 5.5 > INTR
Vector addresses: TRAP 0024H, RST 7.5 003CH, RST 6.5 0034H, RST 5.5 002CH
EI / DI enable and disable maskable interrupts; SIM / RIM set and read masks.</pre>
<ul>
<li>Machine cycles: opcode fetch (4 T-states; some need 6), memory read/write (3 T-states), I/O read/write (3 T-states). Instruction cycle = one or more machine cycles.</li>
<li>Stack grows downward: PUSH decrements SP, POP increments SP. CALL pushes the return address.</li>
</ul>
<pre>; Add two 8-bit numbers stored at 2050H and 2051H, store result at 2052H
LDA  2050H     ; A = first number
MOV  B, A
LDA  2051H     ; A = second number
ADD  B         ; A = A + B
STA  2052H     ; save the result
HLT</pre>

<h3>2. 8086 (16-bit)</h3>
<ul>
<li>16-bit data bus, 20-bit address bus = <strong>1 MB</strong> memory. <strong>Pipelined</strong> architecture with two units: <strong>BIU</strong> (bus interface: fetches instructions, 6-byte queue, generates addresses) and <strong>EU</strong> (execution unit). Fetch overlaps with execute for higher throughput.</li>
<li><strong>Registers:</strong> AX, BX, CX, DX (general purpose; AX accumulator, BX base, CX count, DX data/IO), SP, BP (stack/base pointers), SI, DI (index), IP, and segment registers <strong>CS, DS, SS, ES</strong>.</li>
<li><strong>Flags (9):</strong> status: CF, PF, AF, ZF, SF, OF; control: TF (trap), IF (interrupt enable), DF (direction for string ops).</li>
</ul>
<pre>Physical address = Segment × 16 + Offset   (20 bits)
Example: CS = 2000H, IP = 0100H → physical = 20000H + 0100H = 20100H
Memory is split into even and odd banks (A0 and BHE select byte/word access).
Interrupt vector table: first 1 KB (00000H–003FFH) holds 256 vectors × 4 bytes (IP, CS).
Type 0 divide error, Type 1 single step, Type 2 NMI, Type 3 breakpoint, Type 4 overflow.</pre>
<ul>
<li><strong>Addressing modes:</strong> register, immediate, direct, register indirect, based, indexed, based-indexed, string, I/O port.</li>
<li><strong>Min vs max mode:</strong> minimum mode = single processor (8086 generates control signals); maximum mode = multiprocessor systems with the 8288 bus controller and 8087 coprocessor.</li>
</ul>

<h3>3. 8085 vs 8086 (common question)</h3>
<pre>              8085                  8086
Data bus      8-bit                 16-bit
Address       16-bit (64 KB)        20-bit (1 MB)
Pipelining    No                    Yes (6-byte queue)
Segmentation  No                    Yes (CS, DS, SS, ES)
Flags         5                     9
Multiplication/division instructions: not in 8085, available in 8086</pre>`
},
{
  title: 'Microcontrollers & Embedded Systems — 8051, ARM, UART/SPI/I2C',
  category: 'ECE', order: 16,
  description: '8051 architecture, timers, serial, ARM Cortex-M, communication protocols, RTOS basics, embedded C interview points',
  tags: ['8051','ARM Cortex-M','Embedded','UART','SPI','I2C','RTOS','Embedded C'],
  content: `<h2>Microcontrollers & Embedded Systems</h2>
<h3>1. 8051 Microcontroller</h3>
<ul>
<li>8-bit MCU: 4 KB on-chip ROM, 128 B RAM, two 16-bit timers/counters, one full-duplex UART, 32 I/O lines (ports P0–P3), 5 interrupt sources (INT0, Timer0, INT1, Timer1, Serial). Harvard architecture (separate code and data memory).</li>
<li>One <strong>machine cycle = 12 clock cycles</strong>. With an 11.0592 MHz crystal, a machine cycle takes about 1.085 µs.</li>
<li>Four register banks (R0–R7 each) chosen by RS1, RS0 bits of the PSW. PSW flags: CY, AC, F0, RS1, RS0, OV, parity P.</li>
<li>Port 0 is multiplexed (low address/data) and needs pull-ups; Port 2 gives the higher address byte.</li>
</ul>
<pre>Timer modes (TMOD): Mode 0 = 13-bit, Mode 1 = 16-bit, Mode 2 = 8-bit auto-reload, Mode 3 = split timer
Serial baud rate with Timer 1 in Mode 2 (SMOD = 0): baud = fosc / (384 × (256 − TH1))
For 9600 baud at 11.0592 MHz: TH1 = 0FDH (253)
Interrupt priority (default): INT0 > Timer0 > INT1 > Timer1 > Serial</pre>

<h3>2. ARM Cortex-M (Modern Embedded Standard)</h3>
<ul>
<li>32-bit RISC core with Thumb-2 instruction set, 3-stage pipeline (M3/M4), low power. Registers R0–R12, R13 (SP), R14 (LR), R15 (PC), plus xPSR.</li>
<li><strong>NVIC</strong> (nested vectored interrupt controller) gives programmable priorities and low-latency interrupts; <strong>SysTick</strong> timer for RTOS ticks. Cortex-M4 adds DSP instructions and optional FPU.</li>
<li>Harvard-style bus with memory-mapped peripherals: GPIO, timers, ADC, DAC, UART, SPI, I2C, DMA, watchdog.</li>
</ul>

<h3>3. Communication Protocols</h3>
<pre>UART : asynchronous, 2 wires (TX, RX), start bit + 8 data + stop bit, both sides must use the same baud rate
SPI  : synchronous, 4 wires (SCK, MOSI, MISO, CS), full duplex, fast (tens of MHz), one CS line per slave
I2C  : synchronous, 2 wires (SDA, SCL), open-drain with pull-up resistors, 7-bit address, ACK/NACK,
       multi-master, speeds 100 kHz / 400 kHz / 1 MHz
CAN  : differential two-wire bus, message priority by arbitration, noise immune, used in automotive
RS-232 / RS-485 : serial standards (RS-485 is differential, long distance, multi-drop)</pre>
<ul>
<li>I2C needs fewer wires and supports many devices; SPI is faster and simpler but needs more pins.</li>
<li>DMA moves data between peripheral and memory without CPU involvement. ADC resolution (bits) and sampling rate decide accuracy; PWM with timers controls motors/LEDs.</li>
</ul>

<h3>4. RTOS Concepts</h3>
<ul>
<li>Task, scheduler (pre-emptive priority-based, round robin), context switch, <strong>semaphore</strong> (signalling/counting), <strong>mutex</strong> (mutual exclusion with ownership), message queue.</li>
<li><strong>Priority inversion:</strong> a high-priority task waits for a low-priority task holding a lock while a medium-priority task runs. Solved by priority inheritance. <strong>Deadlock</strong> needs mutual exclusion, hold and wait, no pre-emption and circular wait.</li>
<li>Hard real-time (missing a deadline is a failure) vs soft real-time.</li>
</ul>

<h3>5. Embedded C Interview Points</h3>
<ul>
<li><strong>volatile:</strong> tells the compiler a variable can change outside program flow (hardware register, ISR-modified variable), so it must not be optimised away.</li>
<li>ISR rules: keep it short, no blocking calls, no printf, shared data must be protected.</li>
<li>Endianness: little-endian stores the least significant byte at the lowest address (ARM, x86 typically).</li>
<li>Harvard (separate instruction/data buses) vs Von Neumann (single bus). RISC (simple fixed-length instructions, load/store) vs CISC.</li>
<li>Debouncing a switch: delay 10–20 ms or use a hardware RC filter.</li>
</ul>
<pre>// Bit manipulation (very common interview question)
reg |=  (1U &lt;&lt; n);     // set bit n
reg &amp;= ~(1U &lt;&lt; n);     // clear bit n
reg ^=  (1U &lt;&lt; n);     // toggle bit n
bit = (reg &gt;&gt; n) &amp; 1U;   // read bit n

// Check if a number is a power of 2
int isPow2(unsigned x) { return x &amp;&amp; !(x &amp; (x - 1)); }

// Count set bits
int count = 0; while (x) { x &amp;= (x - 1); count++; }</pre>`
},
{
  title: 'VLSI 1 — MOSFET Operation, Short-Channel Effects & CMOS Inverter',
  category: 'ECE', order: 17,
  description: 'MOS physics, threshold voltage, body effect, leakage, CMOS inverter VTC, noise margin, delay and power',
  tags: ['VLSI','MOSFET','CMOS Inverter','Threshold Voltage','Short Channel','Noise Margin','Power'],
  content: `<h2>VLSI Design — MOSFET & CMOS Inverter</h2>
<h3>1. MOSFET Operation</h3>
<ul>
<li>MOS structure: gate – oxide – substrate. By increasing VGS the surface goes from accumulation → depletion → <strong>inversion</strong> (channel forms) at VGS = Vt.</li>
<li><strong>Threshold voltage:</strong> Vt = Vt0 + γ·( √(2φF + VSB) − √(2φF) ). A positive source-to-body voltage VSB raises Vt: the <strong>body effect</strong>.</li>
<li><strong>Cutoff:</strong> VGS &lt; Vt. <strong>Triode (linear):</strong> VDS &lt; VGS − Vt, acts as a voltage-controlled resistor. <strong>Saturation:</strong> VDS ≥ VGS − Vt, acts as a current source.</li>
</ul>
<pre>Triode     : ID = µn·Cox·(W/L)·[ (VGS − Vt)·VDS − VDS²/2 ]
Saturation : ID = ½·µn·Cox·(W/L)·(VGS − Vt)²·(1 + λ·VDS)
k'n = µn·Cox      Process gain β = k'n·(W/L)
Electron mobility µn is about 2–3 times hole mobility µp, so a PMOS of the same size is weaker.</pre>
<ul>
<li>NMOS passes a strong 0 and a weak 1 (output up to VDD − Vt). PMOS passes a strong 1 and a weak 0.</li>
</ul>

<h3>2. Short-Channel & Second-Order Effects</h3>
<ul>
<li><strong>Channel-length modulation:</strong> finite output resistance in saturation (λ).</li>
<li><strong>Velocity saturation:</strong> at high lateral field carriers saturate, so ID becomes linear in (VGS − Vt) instead of quadratic.</li>
<li><strong>DIBL</strong> (drain-induced barrier lowering): drain voltage lowers the source barrier, reducing Vt. <strong>Vt roll-off</strong> in very short channels. <strong>Hot-carrier effects</strong> degrade the oxide over time.</li>
<li><strong>Subthreshold conduction:</strong> ID ∝ exp((VGS − Vt)/(n·VT)) below threshold. Subthreshold swing S = 2.3·n·kT/q ≥ 60 mV/decade at room temperature. It is the main source of static leakage.</li>
<li>Other leakage: gate-oxide tunnelling, junction leakage, GIDL.</li>
</ul>

<h3>3. CMOS Inverter</h3>
<ul>
<li>PMOS (pull-up) connected to VDD, NMOS (pull-down) to ground. For a static input one of them is off, so <strong>ideal static power is zero</strong> and the output swings rail to rail (full VDD).</li>
<li><strong>Switching threshold</strong> VM is where Vin = Vout (both in saturation). With r = √(kp/kn):</li>
</ul>
<pre>VM = ( VTn + r·(VDD + VTp) ) / (1 + r)       (VTp is negative)
If kn = kp and VTn = −VTp, then VM = VDD/2 (symmetric inverter)
To make kn = kp, size Wp ≈ 2 to 3 × Wn.
Raising PMOS strength moves VM up; raising NMOS strength moves VM down.</pre>
<ul>
<li><strong>Noise margins:</strong> NML = VIL − VOL, NMH = VOH − VIH. VIL and VIH are the points where the VTC slope is −1. A steep (high-gain) transition region gives good noise margins.</li>
<li>VTC regions (as Vin rises): NMOS off, PMOS linear → NMOS sat, PMOS linear → both saturated (high gain, VM) → NMOS linear, PMOS sat → PMOS off.</li>
</ul>

<h3>4. Delay & Power</h3>
<pre>tpHL ≈ 0.69·Rn·CL      tpLH ≈ 0.69·Rp·CL      tp = (tpHL + tpLH)/2
Ring oscillator frequency f = 1 / (2·N·tp)   (N odd number of inverters)
Dynamic power   Pdyn = α·CL·VDD²·f            (α = switching activity)
Short-circuit power: both transistors on briefly during input transitions
Static (leakage) power: Ileak·VDD (rises sharply in modern nodes)
Energy per switching event ≈ CL·VDD²  (half stored in C, half dissipated)</pre>
<ul>
<li>Reducing VDD reduces dynamic power quadratically but slows the gate: delay ∝ VDD / (VDD − Vt)^α.</li>
<li><strong>Latch-up:</strong> parasitic PNPN thyristor in bulk CMOS triggers a short between VDD and GND. Prevented by guard rings, substrate/well contacts, retrograde wells and epitaxial substrates.</li>
</ul>`
},
{
  title: 'VLSI 2 — CMOS Logic Styles, Sizing & Logical Effort',
  category: 'ECE', order: 18,
  description: 'Static CMOS gates, pass-transistor, transmission gate, dynamic/domino logic, pseudo-NMOS, logical effort, Elmore delay',
  tags: ['VLSI','CMOS Logic','Domino Logic','Logical Effort','Elmore Delay','Pass Transistor'],
  content: `<h2>CMOS Logic Design</h2>
<h3>1. Static Complementary CMOS</h3>
<ul>
<li><strong>PDN</strong> (NMOS network) pulls output to 0; <strong>PUN</strong> (PMOS network) pulls it to 1. The PUN is the dual of the PDN: series NMOS = AND, parallel NMOS = OR; for the PUN series ↔ parallel is swapped.</li>
<li>An n-input gate needs 2n transistors. NAND2: NMOS in series, PMOS in parallel. NOR2: NMOS in parallel, PMOS in series.</li>
<li>Gate output is always inverting (single stage): AND = NAND + inverter.</li>
<li>Rail-to-rail swing, high noise margins, no static current. Cost: 2n transistors, larger input capacitance.</li>
</ul>
<pre>Sizing for equal drive to a reference inverter (Wn = 1, Wp = 2):
NAND_k : NMOS width = k, PMOS width = 2        NOR_k : NMOS width = 1, PMOS width = 2k
Series stack of k transistors is roughly k times slower → size the series devices k times larger.
NAND is preferred over NOR because series NMOS is faster than series PMOS (mobility).</pre>
<ul>
<li><strong>Complex (AOI / OAI) gates</strong> such as Y = ~(A·B + C·D) implement multiple levels in one stage, saving area and delay.</li>
<li>Euler-path approach orders inputs in a layout so that NMOS and PMOS diffusion can be shared (abutted) without breaks.</li>
</ul>

<h3>2. Pass-Transistor & Transmission-Gate Logic</h3>
<ul>
<li>A single NMOS pass transistor degrades a logic 1 to VDD − Vt (and with body effect even more), so it needs a level restorer. Fewer transistors for XOR and mux.</li>
<li><strong>Transmission gate (TG):</strong> NMOS and PMOS in parallel with complementary gate signals; passes both 0 and 1 without degradation. Used for multiplexers, XOR and latches/flip-flops.</li>
</ul>

<h3>3. Ratioed Logic — Pseudo-NMOS</h3>
<ul>
<li>PUN replaced by a single always-on PMOS. Fewer transistors (n + 1) and faster, but there is <strong>static power</strong> when the output is low, and VOL is non-zero (depends on the W/L ratio).</li>
</ul>

<h3>4. Dynamic Logic</h3>
<ul>
<li>Two phases with a clock: <strong>precharge</strong> (clk = 0, output charged to VDD) and <strong>evaluate</strong> (clk = 1, PDN may discharge the output). Only n + 2 transistors, smaller load, faster, no static power.</li>
<li>Drawbacks: leakage and charge sharing can corrupt the stored value, needs a minimum clock frequency, higher clock load, noise sensitivity, and the output can only fall once per evaluate phase.</li>
<li><strong>Domino logic:</strong> dynamic gate followed by a static inverter, so cascaded outputs only make monotonic 0→1 transitions and can be chained. Non-inverting only. Keeper transistors fight leakage.</li>
</ul>

<h3>5. Logical Effort</h3>
<pre>Gate delay d = g·h + p
g = logical effort (gate's input capacitance relative to an inverter delivering the same current)
h = electrical effort = Cout / Cin       p = parasitic delay
Inverter g = 1 ; NAND2 g = 4/3 ; NOR2 g = 5/3 ; NAND3 g = 5/3 ; NOR3 g = 7/3
Path effort F = G·B·H  (G = ∏g, B = branching effort, H = Cout / Cin of the path)
Best stage effort f = F^(1/N)       Optimum number of stages ≈ log4(F)
Path delay D = N·F^(1/N) + P
FO4 delay: inverter driving four identical inverters, a process-independent unit of delay</pre>

<h3>6. RC Delay & Interconnect</h3>
<ul>
<li><strong>Elmore delay</strong> of an RC tree: τ = Σ Ri·Ci where Ri is the resistance shared between the path to the output and the path to node i, and Ci is the capacitance at node i. For a distributed RC wire, delay ≈ 0.38·R·C (grows with length squared).</li>
<li>Long wires are broken up with <strong>repeaters</strong> (buffers) so delay becomes linear in length. Modern designs are interconnect-dominated: wire resistance, crosstalk and coupling capacitance matter.</li>
</ul>`
},
{
  title: 'VLSI 3 — Fabrication, Layout, Design Rules & Scaling',
  category: 'ECE', order: 19,
  description: 'CMOS fabrication flow, lithography, FinFET, layout and design rules, latch-up, Dennard scaling, process corners, yield',
  tags: ['VLSI','Fabrication','Lithography','FinFET','Layout','Scaling','Process Corners'],
  content: `<h2>Fabrication, Layout & Scaling</h2>
<h3>1. CMOS Fabrication Steps</h3>
<ul>
<li><strong>Wafer:</strong> single-crystal silicon grown by the Czochralski method, sliced and polished.</li>
<li><strong>Oxidation:</strong> grow SiO₂ (dry gives thin, high-quality gate oxide; wet is faster, used for thick field oxide).</li>
<li><strong>Photolithography:</strong> coat photoresist, expose through a mask with UV/DUV/EUV light, develop. Resolution ≈ k1·λ/NA; immersion and EUV (13.5 nm) enable the smallest nodes; multi-patterning splits one layer into several masks.</li>
<li><strong>Etching:</strong> wet (isotropic) or dry/plasma (anisotropic, needed for fine features).</li>
<li><strong>Doping:</strong> <strong>ion implantation</strong> (precise dose and depth, followed by annealing) is preferred to thermal diffusion; the polysilicon (or metal) gate acts as a mask for self-aligned source/drain.</li>
<li><strong>Deposition:</strong> CVD, sputtering/PVD, ALD for thin films. <strong>Metallization:</strong> copper damascene (dual-damascene) interconnects with low-k dielectrics. <strong>CMP</strong> planarizes each layer.</li>
<li>Isolation: LOCOS (older) vs <strong>STI</strong> (shallow trench isolation). Silicides (salicide) reduce gate and contact resistance.</li>
<li>Well options: n-well, p-well or twin-tub process on a p-type substrate (the most common is n-well CMOS).</li>
</ul>

<h3>2. Modern Device Structures</h3>
<ul>
<li><strong>FinFET:</strong> a thin vertical silicon fin with the gate wrapped on three sides gives much better electrostatic control than planar bulk, so less leakage and less short-channel effect. Drive current is increased by adding fins, so width is quantized.</li>
<li><strong>Gate-all-around (nanosheet) FETs</strong> are the successor at the 3 nm class. <strong>SOI</strong> reduces junction capacitance and latch-up. High-k metal gate replaced SiO₂/poly to cut gate leakage.</li>
</ul>

<h3>3. Layout & Design Rules</h3>
<ul>
<li><strong>Design rules</strong> specify minimum width, spacing, enclosure and overlap per layer so the chip can be manufactured with acceptable yield. <strong>λ-based rules</strong> scale with the process (Mead–Conway); micron rules are absolute and used in industry.</li>
<li><strong>Stick diagrams</strong> show relative placement of devices and wires before the full layout. Layers: n-well, active, poly, n+/p+ implants, contacts, metal1, via1, metal2 and so on.</li>
<li>Layout practices: common-centroid and interdigitated devices for matching in analog circuits, guard rings against latch-up, dummy fill for density rules, avoid <strong>antenna effect</strong> (charge collection on long metal during plasma etching damaging gate oxide; fixed with diode insertion or jumper layers).</li>
</ul>

<h3>4. Scaling</h3>
<pre>Constant-field (Dennard) scaling by factor S &gt; 1:
 dimensions L, W, tox ÷ S ,  voltage VDD, Vt ÷ S ,  doping × S
 → gate delay ÷ S ,  power per gate ÷ S² ,  power density constant ,  transistor density × S²
Constant-voltage scaling: voltages unchanged → power density rises ~S³ (not sustainable)
Dennard scaling slowed after ~2005: Vt cannot scale (subthreshold leakage grows), so power density and heat became the limit
Moore's law: transistor count doubles roughly every two years (an economic and engineering trend, not a physical law)</pre>
<ul>
<li>Scaling issues: DIBL, Vt roll-off, gate-oxide tunnelling, interconnect delay (wires don't scale well), process variation, reliability (NBTI, electromigration, TDDB).</li>
</ul>

<h3>5. Variation, Corners & Yield</h3>
<ul>
<li><strong>PVT:</strong> Process, Voltage, Temperature. Corners: TT (typical), FF (fast NMOS, fast PMOS), SS (slow-slow), FS and SF (skewed, important for SRAM and analog). A design must meet timing at slow corners and hold at fast corners.</li>
<li><strong>Yield</strong> (Poisson model) Y = e^(−A·D0), where A is the die area and D0 the defect density; large dies yield less. This is why chiplets and redundancy (spare rows in memories) are used.</li>
</ul>`
},
{
  title: 'VLSI 4 — Static Timing Analysis, Clocking & Memories',
  category: 'ECE', order: 20,
  description: 'Setup/hold analysis, slack, skew, clock tree, metastability, CDC, SRAM 6T cell, DRAM, flash',
  tags: ['VLSI','STA','Setup Hold','Clock Skew','Metastability','SRAM','CDC'],
  content: `<h2>Timing, Clocking & Memory</h2>
<h3>1. Static Timing Analysis (STA)</h3>
<pre>Launch flop → combinational logic → capture flop

Setup check : Tclk ≥ tcq + tlogic(max) + tsu + tskew(uncertainty)
Hold check  : tcq + tlogic(min) ≥ thold + tskew
Slack = required time − arrival time      (negative slack = violation)
Critical path = path with the smallest setup slack</pre>
<ul>
<li>STA checks all paths without needing input vectors (unlike simulation), covering flop-to-flop, input-to-flop, flop-to-output and input-to-output paths. Needs SDC constraints (clocks, I/O delays, false paths, multicycle paths).</li>
<li><strong>Fixing setup violations:</strong> reduce logic depth/pipeline, upsize or buffer critical gates, swap to lower-Vt cells, retiming, useful skew, or reduce the clock frequency.</li>
<li><strong>Fixing hold violations:</strong> insert delay buffers on the short path. Slowing the clock does not help hold. Hold fixing costs area and power.</li>
<li>Positive skew (capture clock arrives later) helps setup but hurts hold, and vice versa.</li>
<li>Multi-corner multi-mode (MCMM) analysis and OCV derating account for variation.</li>
</ul>

<h3>2. Clocking</h3>
<ul>
<li><strong>Skew</strong> is the spatial difference in clock arrival; <strong>jitter</strong> is the temporal variation of a clock edge.</li>
<li><strong>Clock tree synthesis (CTS):</strong> balances insertion delay to all flops using buffers/inverters in an H-tree or clock mesh/spine structure. The clock network is a large part of dynamic power.</li>
<li><strong>Clock gating:</strong> an ICG (integrated clock gating cell with latch + AND) stops the clock to idle blocks and saves power while avoiding glitches.</li>
<li>Latch-based design allows <strong>time borrowing</strong>; flip-flop based design is simpler for STA.</li>
</ul>

<h3>3. Metastability & Clock-Domain Crossing</h3>
<ul>
<li>When data changes within the setup/hold window the flop output can become metastable and take a random time to resolve. The probability of failure falls exponentially with the available resolution time; MTBF = e^(T/τ) / (Tw·fclk·fdata).</li>
<li><strong>Two-flop synchronizer</strong> for single-bit signals across asynchronous clock domains. For multi-bit buses: Gray-coded counters, handshake protocols, or <strong>asynchronous FIFO</strong> with Gray-coded read/write pointers.</li>
<li>Pulse crossing from fast to slow clock needs pulse stretching or toggle synchronization. Common CDC mistakes: sending multi-bit binary values through independent synchronizers, reconvergence of synchronized signals.</li>
</ul>

<h3>4. Memories</h3>
<ul>
<li><strong>6T SRAM cell:</strong> two cross-coupled inverters + two NMOS access transistors (word line WL, bit lines BL and BLB). Read: precharge bit lines, assert WL, sense amplifier detects small differential. Write: drive bit lines strongly to override the cell.</li>
<li>Sizing rule: pull-down (driver) &gt; access &gt; pull-up. A <strong>cell ratio</strong> (driver/access) of about 1.2–2 gives read stability; <strong>pull-up ratio</strong> (access/pull-up) above 1 gives write-ability. The <strong>static noise margin (SNM)</strong> quantifies read stability, which falls at low VDD.</li>
<li><strong>DRAM:</strong> 1 transistor + 1 capacitor, dense and cheap, needs periodic refresh (~64 ms), reads are destructive (write-back). <strong>Flash:</strong> floating-gate non-volatile cell; NOR (random access, code) and NAND (dense, sequential, storage).</li>
<li><strong>CAM:</strong> content-addressable memory for lookups (caches, routers). Cache hierarchy trades size and speed.</li>
</ul>`
},
{
  title: 'VLSI 5 — Verilog HDL, RTL Coding & ASIC Design Flow',
  category: 'ECE', order: 21,
  description: 'Verilog syntax, blocking vs non-blocking, FSM and testbench examples, latches, synthesis rules, RTL to GDSII flow, ASIC vs FPGA',
  tags: ['Verilog','RTL','HDL','FSM','Testbench','Synthesis','ASIC Flow','FPGA'],
  content: `<h2>Verilog HDL & Design Flow</h2>
<h3>1. Verilog Basics</h3>
<ul>
<li>A design is a <strong>module</strong> with ports (input, output, inout). Data types: <code>wire</code> (connections, driven by assign or module outputs) and <code>reg</code> (variables assigned inside procedural blocks; it does not always mean a hardware register). Values: 0, 1, x (unknown), z (high impedance).</li>
<li>Modelling levels: behavioural, RTL (dataflow), gate level, switch level.</li>
<li><code>assign</code> = continuous assignment (combinational). <code>always</code> block = procedural; <code>initial</code> runs once at time 0 (testbenches, not synthesizable in ASIC flow).</li>
</ul>

<h3>2. Blocking vs Non-Blocking (very important)</h3>
<ul>
<li><strong>Blocking (=):</strong> executes in order, like software. Use in combinational <code>always @(*)</code>.</li>
<li><strong>Non-blocking (&lt;=):</strong> all right-hand sides are evaluated first, then updated together at the end of the time step. Use in sequential <code>always @(posedge clk)</code> to model flip-flops and avoid race conditions.</li>
</ul>
<pre>// Shift register: non-blocking gives 3 flops in a chain
always @(posedge clk) begin
    q1 &lt;= d;
    q2 &lt;= q1;
    q3 &lt;= q2;
end
// If blocking (=) were used, d would race straight through to q3 in a single clock (wrong).</pre>

<h3>3. Common Examples</h3>
<pre>// D flip-flop with asynchronous active-low reset
module dff (input clk, rst_n, d, output reg q);
    always @(posedge clk or negedge rst_n)
        if (!rst_n) q &lt;= 1'b0;
        else        q &lt;= d;
endmodule

// 4:1 mux (combinational, full case coverage)
always @(*) begin
    case (sel)
        2'b00: y = a;
        2'b01: y = b;
        2'b10: y = c;
        default: y = d;     // default avoids an inferred latch
    endcase
end

// 4-bit synchronous up counter with synchronous reset
always @(posedge clk)
    if (rst) count &lt;= 4'd0;
    else     count &lt;= count + 4'd1;</pre>

<h3>4. FSM — Moore Sequence Detector for "101" (overlapping)</h3>
<pre>module seq101 (input clk, rst, in, output out);
    parameter S0 = 2'd0, S1 = 2'd1, S2 = 2'd2, S3 = 2'd3;
    reg [1:0] state, next;

    always @(posedge clk)             // state register
        if (rst) state &lt;= S0;
        else     state &lt;= next;

    always @(*) begin                 // next-state logic
        case (state)
            S0: next = in ? S1 : S0;
            S1: next = in ? S1 : S2;
            S2: next = in ? S3 : S0;
            S3: next = in ? S1 : S2;  // overlap: last '1' can start a new sequence
            default: next = S0;
        endcase
    end

    assign out = (state == S3);       // Moore output depends only on state
endmodule</pre>

<h3>5. Testbench</h3>
<pre>&#96;timescale 1ns/1ps
module tb;
    reg clk = 0, rst, in;
    wire out;
    seq101 dut (.clk(clk), .rst(rst), .in(in), .out(out));

    always #5 clk = ~clk;             // 10 ns clock period

    initial begin
        rst = 1; in = 0;
        #12 rst = 0;
        #10 in = 1; #10 in = 0; #10 in = 1;
        #50 $finish;
    end
    initial $monitor("t=%0t in=%b out=%b", $time, in, out);
endmodule</pre>

<h3>6. Synthesis Rules & Interview Points</h3>
<ul>
<li><strong>Latch inference:</strong> an incomplete <code>if</code> or <code>case</code> in a combinational block (not all branches assign the output) infers a latch. Always assign defaults or cover all cases.</li>
<li>Sensitivity list: use <code>@(*)</code> for combinational logic so no signal is missed. Don't mix blocking and non-blocking for the same variable.</li>
<li>Non-synthesizable constructs: <code>#delay</code>, <code>$display</code>, <code>initial</code> (mostly), <code>fork-join</code>, file I/O.</li>
<li><strong>== vs ===:</strong> == returns x if any operand has x/z; === compares x and z literally (simulation only).</li>
<li>Synchronous vs asynchronous reset: sync reset needs the clock and adds logic to the D path; async reset acts immediately but its de-assertion must be synchronized to avoid metastability (reset synchronizer).</li>
<li>Latch vs flip-flop, glitch-free outputs, one-hot vs binary encoding, parameterized modules with <code>parameter</code> and <code>generate</code>.</li>
<li>SystemVerilog adds <code>logic</code> type, <code>always_ff</code>/<code>always_comb</code>, interfaces and assertions; UVM is the standard verification methodology.</li>
</ul>

<h3>7. RTL to GDSII (ASIC Flow)</h3>
<pre>1. Specification and architecture
2. RTL design (Verilog/VHDL) + functional simulation / linting
3. Logic synthesis: RTL → gate-level netlist using the standard-cell library (.lib) and constraints (SDC)
4. DFT insertion (scan chains), formal equivalence check (RTL vs netlist)
5. Floorplanning (die size, macro placement, power grid) → Placement
6. Clock tree synthesis (CTS)
7. Routing (global + detailed)
8. Static timing analysis, power analysis, signal-integrity and ECOs (timing closure)
9. Physical verification: DRC (design rules), LVS (layout vs schematic), ERC / antenna checks
10. GDSII tape-out to the foundry</pre>
<ul>
<li><strong>FPGA vs ASIC:</strong> FPGA = reconfigurable LUTs, flip-flops, block RAMs and DSP slices; no fabrication cost, fast time to market, but higher unit cost, power and lower speed. ASIC = custom silicon; high NRE (mask) cost but lowest unit cost, best performance and power at volume.</li>
<li>Tool families: Cadence, Synopsys, Siemens EDA; open-source flow: Yosys + OpenROAD.</li>
</ul>`
},
{
  title: 'VLSI 6 — Low Power Design, DFT & VLSI Interview Questions',
  category: 'ECE', order: 22,
  description: 'Power components, clock/power gating, DVFS, scan chain, ATPG, BIST, JTAG, plus 20+ frequently asked VLSI questions',
  tags: ['VLSI','Low Power','DFT','Scan Chain','BIST','JTAG','Interview Questions'],
  content: `<h2>Low Power, DFT & Interview Q&A</h2>
<h3>1. Power Components</h3>
<pre>Ptotal = Pdynamic + Pshort-circuit + Pleakage
Pdynamic = α·C·VDD²·f      (switching activity α, load capacitance C, frequency f)
Pleakage : subthreshold + gate tunnelling + junction/GIDL (dominant at advanced nodes and high temperature)</pre>

<h3>2. Low-Power Techniques</h3>
<ul>
<li><strong>Clock gating:</strong> stop the clock to idle registers, cuts dynamic power on the clock network.</li>
<li><strong>Power gating:</strong> sleep transistors (header PMOS or footer NMOS) cut off the supply of idle blocks to remove leakage. Needs isolation cells, retention flops and state-restore sequencing.</li>
<li><strong>Multi-Vt:</strong> high-Vt cells on non-critical paths (low leakage), low-Vt on critical paths (fast). <strong>Multi-VDD</strong> domains need level shifters. <strong>DVFS</strong> varies voltage and frequency with workload (power falls roughly with V²·f). Operand isolation, bus encoding and architectural parallelism reduce activity.</li>
<li>Back-gate/body biasing, FinFET and FD-SOI devices to reduce leakage.</li>
</ul>

<h3>3. Design for Test (DFT)</h3>
<ul>
<li><strong>Fault models:</strong> stuck-at-0 / stuck-at-1 (most common), transition/delay faults, bridging, open faults.</li>
<li><strong>Scan chain:</strong> each flop is replaced by a scan flop (a mux-D flop with scan-in, scan-enable). In shift mode the flops form a long shift register so any state can be loaded and observed; in capture mode the normal logic runs for one clock. Makes sequential circuits testable like combinational ones. Cost: area, a mux delay on the D path.</li>
<li><strong>ATPG</strong> tools generate test patterns (D-algorithm, PODEM) targeting a high fault coverage. <strong>BIST:</strong> LFSR generates patterns, MISR compresses the responses; <strong>MBIST</strong> tests embedded memories (March algorithms).</li>
<li><strong>JTAG / boundary scan (IEEE 1149.1):</strong> pins TDI, TDO, TCK, TMS (optional TRST); used for board testing, debug and programming.</li>
<li>Yield, test coverage and test time/cost drive the choice of DFT techniques.</li>
</ul>

<h3>4. Frequently Asked VLSI Interview Questions</h3>
<ul>
<li><strong>Why is the PMOS made wider than NMOS?</strong> Hole mobility is 2–3 times lower, so Wp ≈ 2–3·Wn equalizes rise and fall times and puts VM near VDD/2.</li>
<li><strong>Why is NAND preferred over NOR in CMOS?</strong> NAND has series NMOS (fast), NOR has series PMOS (slow because of low hole mobility), so NOR needs wider PMOS and is larger/slower.</li>
<li><strong>What is the body effect?</strong> Vt increases with source-to-body reverse bias.</li>
<li><strong>What is channel-length modulation, DIBL, velocity saturation?</strong> See VLSI 1 (finite ro, drain lowers barrier, current saturates at high field).</li>
<li><strong>Why does a CMOS inverter have zero static power?</strong> One device is always off, so there is no DC path between VDD and GND (ignoring leakage).</li>
<li><strong>What is latch-up and how is it prevented?</strong> Parasitic SCR in bulk CMOS; prevent with guard rings, well taps, spacing, epi substrate.</li>
<li><strong>Setup vs hold violation and fixes?</strong> Setup: slow path, fix by pipelining/upsizing/lower clock. Hold: fast path, fix by adding delay buffers (not by changing frequency).</li>
<li><strong>What is metastability? How do you avoid it?</strong> Output stuck between levels after setup/hold violation; use 2-flop synchronizers, handshakes or async FIFOs.</li>
<li><strong>Blocking vs non-blocking?</strong> Blocking = sequential execution (combinational logic); non-blocking = parallel update (sequential logic).</li>
<li><strong>How is a latch inferred in Verilog?</strong> Incomplete if/case in a combinational always block.</li>
<li><strong>Glitch vs hazard?</strong> Unwanted transient pulses due to unequal path delays; removed with redundant terms, balanced paths, or registered outputs.</li>
<li><strong>Why FinFET?</strong> Better gate control, much lower leakage and short-channel effects than planar bulk at advanced nodes.</li>
<li><strong>What is clock skew and its effect?</strong> Difference in clock arrival time: helps one of setup/hold and hurts the other.</li>
<li><strong>Difference between latch and flip-flop?</strong> Latch is level-sensitive, flip-flop is edge-triggered (two latches back-to-back).</li>
<li><strong>What is an ICG cell?</strong> Latch + AND gate that gates the clock without glitches.</li>
<li><strong>Dynamic vs leakage power; how to reduce each?</strong> Reduce α, C, VDD, f for dynamic; use high-Vt, power gating, FinFET for leakage.</li>
<li><strong>Standard cell vs full-custom?</strong> Standard cells = pre-designed library cells placed and routed by tools (fast turnaround); full-custom = hand-crafted transistor-level design for maximum performance (analog, memories, high-speed datapaths).</li>
<li><strong>What are DRC, LVS, ERC?</strong> Design rule check, layout versus schematic (netlist match), electrical rule check.</li>
<li><strong>What is electromigration?</strong> Metal atoms move because of high current density, causing opens/shorts; fixed by wider wires, lower current, copper/cobalt vias.</li>
<li><strong>What is the Elmore delay?</strong> First-moment RC delay estimate τ = Σ Ri·Ci of an RC tree.</li>
</ul>`
},
{
  title: 'Core ECE Interview Quick Revision — Formulas & Must-Know Questions',
  category: 'ECE', order: 23,
  description: 'One-page revision of important ECE formulas and the questions asked most in core, semiconductor and embedded interviews',
  tags: ['ECE','Interview','Revision','Formulas','Core Electronics','Placement'],
  content: `<h2>ECE Placement — Quick Revision</h2>
<h3>1. Which Topics Matter for Which Role</h3>
<ul>
<li><strong>VLSI design / verification / physical design:</strong> digital electronics, CMOS (VLSI 1–6 notes), Verilog/SystemVerilog, STA, basic C/Python scripting.</li>
<li><strong>Analog / mixed-signal:</strong> BJT/MOSFET amplifiers, op-amps, feedback, stability, noise, data converters, layout matching.</li>
<li><strong>Embedded / firmware:</strong> C (pointers, bit operations, volatile), microcontrollers, interrupts, protocols (UART, SPI, I2C, CAN), RTOS basics.</li>
<li><strong>Communication / DSP / wireless:</strong> signals and systems, DSP, analog and digital communication, information theory, antennas.</li>
<li>Many companies also run an aptitude round and a coding round (DSA basics), so keep practising those alongside core subjects.</li>
</ul>

<h3>2. Formula Sheet</h3>
<pre>Thermal voltage VT = kT/q ≈ 26 mV (300 K)
BJT  : gm = IC/VT, rπ = β/gm, ro = VA/IC
MOS  : ID(sat) = ½·k'n·(W/L)·(VGS − Vt)², gm = 2·ID/(VGS − Vt)
Inverting op-amp gain = −Rf/R1 ; non-inverting = 1 + Rf/R1
Feedback: Af = A/(1 + Aβ)
555 astable: f = 1.44/((RA + 2RB)·C)
SQNR (n-bit) = 6.02n + 1.76 dB
Nyquist: fs ≥ 2·fmax          Shannon: C = B·log₂(1 + SNR)
AM: Pt = Pc(1 + μ²/2)          FM (Carson): BW = 2(Δf + fm)
BPSK: Pe = Q(√(2Eb/N0))
FFT: N/2·log₂N complex multiplies          Δf = fs/N
Second-order: Mp = exp(−πζ/√(1−ζ²)), ts ≈ 4/(ζωn)
Series RLC: ω0 = 1/√(LC), Q = ω0L/R, BW = ω0/Q
Transmission line: Γ = (ZL − Z0)/(ZL + Z0), VSWR = (1 + |Γ|)/(1 − |Γ|)
Dynamic power = α·C·VDD²·f          Setup: Tclk ≥ tcq + tlogic + tsu</pre>

<h3>3. Most Asked Concept Questions</h3>
<ul>
<li>Explain the working of a MOSFET and its regions of operation; draw the CMOS inverter VTC and mark noise margins.</li>
<li>Design a 2-input XOR / mux using NAND gates or transmission gates; minimize a function using a K-map.</li>
<li>Difference between latch and flip-flop; setup and hold time; what happens on a violation; how to fix it.</li>
<li>Design a divide-by-3 counter, a sequence detector, a FIFO or an asynchronous reset synchronizer.</li>
<li>What is feedback? Effect on gain, bandwidth, input and output impedance; condition for oscillation.</li>
<li>Why is CE amplifier gain reduced by Miller effect? How does a cascode help?</li>
<li>Difference between Mealy and Moore; synchronous and asynchronous reset; blocking and non-blocking.</li>
<li>Nyquist theorem and aliasing; difference between FIR and IIR; what is FFT and its complexity.</li>
<li>AM vs FM; why is the superheterodyne receiver used; what is image frequency.</li>
<li>Why does BPSK perform better than ASK and FSK; what is ISI and how does a raised-cosine filter help.</li>
<li>Interrupts in 8051/ARM, how to configure a UART or timer, volatile keyword, SPI vs I2C.</li>
<li>Poles and zeros, stability criteria, gain and phase margin, effect of PID terms.</li>
</ul>

<h3>4. Preparation Tips</h3>
<ul>
<li>Be able to <strong>draw and explain</strong> circuits (inverter, SRAM cell, flip-flop, op-amp circuits) on paper; interviewers care more about reasoning than memorised formulas.</li>
<li>Know your projects deeply (what you designed, trade-offs, results). Revise the subjects listed in your resume first.</li>
<li>Read company job descriptions and prepare the specific tools and topics mentioned; official company career pages and placement cell notices are the source of truth for the process and eligibility.</li>
</ul>`
}
];
