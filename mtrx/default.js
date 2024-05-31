
var axes_selector = document.getElementById("axes_selector");
var mult_selector = document.getElementById("mult_selector");

function overwriteConventionParameters(line)
{
    var params = line.split('&');
    for (var i = params.length - 1; i >= 0; i--)
    {
        var param = params[i];
        if (param.startsWith("axes=") || param.startsWith("mult="))
        {
            params.splice(i, 1);
        }
    }

    params.push("axes=" + axes_selector.value);
    params.push("mult=" + mult_selector.value);

    return params.join('&');
}

function onConventionChange(e)
{
    var diagrams = document.getElementsByClassName("diagram");
    for (const diagram of diagrams)
    {
        var search = diagram.contentWindow.location.search;
        search = overwriteConventionParameters(search);
        diagram.src ="diagram.html" + search;
    }
}

if (axes_selector) axes_selector.addEventListener("change", onConventionChange);
if (mult_selector) mult_selector.addEventListener("change", onConventionChange);

var selectors_dictionary = {};

selectors_dictionary.language_selector = `
    <option value="EN">English</option>'
    <!--option value="RU">Русский</option-->'
`;

selectors_dictionary.mult_selector = `
    <option value="pre">Pre-multiplication</option>
    <option value="post">Post-multiplication</option>
`;

selectors_dictionary.axes_selector = `
    <optgroup label="Popular Left-Handed">
        <option value="RUF">RUF (Unity)</option>
        <option value="FRU">FRU (Unreal)</option>
    </optgroup>
    <optgroup label="Popular Right-Handed">
        <option value="RUB">RUB (Godot, XNA)</option>				
        <option value="RFU">RFU (O3DE, Blender)</option>
        <option value="LUF">LUF (PyTorch3D)</option>
        <option value="RDF">RDF (Vulkan NDC)</option>
    </optgroup>
    <optgroup label="Other Left-Handed">
        <option value="BDL">BDL</option>
        <option value="BLU">BLU</option>
        <option value="BRD">BRD</option>
        <option value="BUR">BUR</option>
        <option value="DBR">DBR</option>
        <option value="DFL">DFL</option>
        <option value="DLB">DLB</option>
        <option value="DRF">DRF</option>
        <option value="FDR">FDR</option>
        <option value="FLD">FLD</option>
        <option value="FUL">FUL</option>
        <option value="LBD">LBD</option>
        <option value="LDF">LDF</option>
        <option value="LFU">LFU</option>
        <option value="LUB">LUB</option>
        <option value="RBU">RBU</option>
        <option value="RDB">RDB</option>
        <option value="RFD">RFD</option>
        <option value="UBL">UBL</option>
        <option value="UFR">UFR</option>
        <option value="ULF">ULF</option>
        <option value="URB">URB</option>
    </optgroup>
    <optgroup label="Other Right-Handed">
        <option value="BDR">BDR</option>
        <option value="BLD">BLD</option>
        <option value="BRU">BRU</option>
        <option value="BUL">BUL</option>
        <option value="DBL">DBL</option>
        <option value="DFR">DFR</option>
        <option value="DLF">DLF</option>
        <option value="DRB">DRB</option>
        <option value="FDL">FDL</option>
        <option value="FLU">FLU</option>
        <option value="FRD">FRD</option>
        <option value="FUR">FUR</option>
        <option value="LBU">LBU</option>
        <option value="LDB">LDB</option>
        <option value="LFD">LFD</option>
        <option value="RBD">RBD</option>
        <option value="UBR">UBR</option>
        <option value="UFL">UFL</option>
        <option value="ULB">ULB</option>
        <option value="URF">URF</option>
    </optgroup>		
`;

for (var key in selectors_dictionary)
{
    var selector = document.getElementById(key);
    if (selector)
    {
        selector.innerHTML = selectors_dictionary[key];
    }
}
