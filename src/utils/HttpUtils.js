exports.GetHttpHeaders = function()
{
        var obj={};
        obj['Accept'] = 'application/json';
        obj['Content-Type'] = 'application/json';
        obj['jwtToken'] = getToken();
        return obj;
}

function getToken()
{
	if(typeof window !== 'undefined' && window && window.localStorage) 
	{
			return localStorage.getItem('jwtToken');
	}
	else
	{
		return "";
	}

}
