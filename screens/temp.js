/*
function filterIt(arr, searchKey) {
    let singleWords = searchKey.split(' ');
    let result = [];

    singleWords.forEach(element => {
        result.push(...arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(element))));
    });

    return result;
}

let xx = [
    { songname: "nitin as", key: "1" },
    { songname: "akash", key: "2" },
    { songname: "lakra", key: "3" },
    { songname: "lakra", key: "4" },
    { songname: "lakra", key: "5" },
    { songname: "lakra", key: "6" },
    { songname: "lakra", key: "70" },
    { songname: "lakra", key: "58" },
];

let ans = filterIt(xx, 'akash as');

console.log(ans);
*/

const getRemoteData = (url) => new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? require('https') : require('http');

    // const options = {
    //     method: 'GET',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         'aftership-api-key': 'b8371576-5259-4897-a24e-915be8afa464'
    //     }
    // };
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Trackingmore-Api-Key": "bdf9f02f-d86a-4cad-858b-27c9491764c2"
        }
    };


    // const respo = ('https://api.aftership.com/v4/trackings/fedex/785813818817', options);
    // const respo = ('https://api.trackingmore.com/v2/trackings/fedex/785813818817', options);
    // var data = await respo.json(); 
    // let output = data;
    // console.log(output);
    const request = client.get(url, options, (response) => {
        if (response.statusCode < 200 || response.statusCode > 299) {
            reject(new Error(`Failed with status code: ${response.statusCode}`));
        }
        const body = [];
        response.on('data', (chunk) => body.push(chunk));
        response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => reject(err));
});

// getRemoteData('https://api.aftership.com/v4/trackings/fedex/785813818817').then((response) => {
//     const data = JSON.parse(response); console.log(data);
// })

getRemoteData('https://api.trackingmore.com/v2/trackings/fedex/786950700091').then((response) => {
    const data = JSON.parse(response); console.log(data);
})